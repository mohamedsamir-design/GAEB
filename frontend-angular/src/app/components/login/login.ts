import { Component, signal, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, UserProgram, UserMenu, UserLibrary } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  protected loginForm: FormGroup;
  protected isLoading = signal(false);
  protected errorMessage = signal('');

  // Data from database
  protected programs = signal<UserProgram[]>([]);
  protected menus = signal<UserMenu[]>([]);
  protected libraries = signal<UserLibrary[]>([]);

  constructor() {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      program: [''],
      menu: [''], 
      currentLibrary: [''] 
    });
  }

  ngOnInit(): void {
    // Load programs, menus, and libraries from database
    this.loadDropdownData();
  }

  private loadDropdownData(): void {
    // Load programs
    this.authService.getPrograms().subscribe({
      next: (data) => this.programs.set(data),
      error: (error) => console.error('Error loading programs:', error)
    });

    // Load menus
    this.authService.getMenus().subscribe({
      next: (data) => this.menus.set(data),
      error: (error) => console.error('Error loading menus:', error)
    });

    // Load libraries
    this.authService.getLibraries().subscribe({
      next: (data) => this.libraries.set(data),
      error: (error) => console.error('Error loading libraries:', error)
    });
  }

  protected onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      const username = this.loginForm.value.user;
      const password = this.loginForm.value.password;
      const programId = this.loginForm.value.program;
      const menuId = this.loginForm.value.menu;
      const libraryId = this.loginForm.value.currentLibrary;

      // Attempt login
      this.authService.login(username, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          
          // If user selected program/menu/library, update them
          if (programId || menuId || libraryId) {
            this.authService.updateUserSelections(response.id, programId, menuId, libraryId).subscribe({
              next: () => {
                this.isLoading.set(false);
                this.router.navigate(['/dashboard']);
              },
              error: (error) => {
                console.error('Error updating selections:', error);
                // Still navigate to dashboard even if update fails
                this.isLoading.set(false);
                this.router.navigate(['/dashboard']);
              }
            });
          } else {
            this.isLoading.set(false);
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          this.isLoading.set(false);
          console.error('Login error:', error);
          
          // Extract error message
          let message = 'حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى.';
          
          if (error.status === 401) {
            message = error.error?.message || 'اسم المستخدم أو كلمة المرور غير صحيحة';
          } else if (error.status === 0) {
            message = 'تعذر الاتصال بالخادم. الرجاء التحقق من اتصال الإنترنت.';
          } else if (error.error?.message) {
            message = error.error.message;
          }
          
          this.errorMessage.set(message);
        }
      });
    } else {
      this.errorMessage.set('الرجاء ملء جميع الحقول المطلوبة بشكل صحيح.');
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  protected getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.touched && field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} مطلوب`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} يجب أن يكون على الأقل ${requiredLength} أحرف`;
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      user: 'المستخدم',
      password: 'كلمة المرور',
      program: 'البرنامج/الإجراء',
      menu: 'القائمة',
      currentLibrary: 'المكتبة الحالية'
    };
    return displayNames[fieldName] || fieldName;
  }
}
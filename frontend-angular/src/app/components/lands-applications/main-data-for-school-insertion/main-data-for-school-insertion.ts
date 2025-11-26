import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-main-data-for-school-insertion',
  imports: [ReactiveFormsModule, HeaderComponent, NgIf],
  templateUrl: './main-data-for-school-insertion.html',
  styleUrl: './main-data-for-school-insertion.css'
})
export class MainDataForSchoolInsertion {
  private router = inject(Router);

  protected goBack(): void {
    this.router.navigate(['/lands-main-menu']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }
  landForm!: FormGroup;

  centers = ['مركز 1', 'مركز 2', 'مركز 3'];
  villages = ['قرية 1', 'قرية 2', 'قرية 3'];
  owners = ['مالك 1', 'مالك 2', 'مالك 3'];

  constructor(private fb: FormBuilder) {
    this.landForm = this.fb.group({
      landNumber: ['', Validators.required],
      landName: ['', Validators.required],
      center: ['', Validators.required],
      village: ['', Validators.required],
      subVillage: ['', Validators.required],
      totalArea: ['', Validators.required],
      owner: ['', Validators.required],
    });
  }

  submit() {
    if (this.landForm.invalid) {
      this.landForm.markAllAsTouched();
      return;
    }

    console.log('Form Data:', this.landForm.value);
  }
}

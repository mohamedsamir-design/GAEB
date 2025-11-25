import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { LandApiService } from '../../../services/land-api.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-land-data-legal-link',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './land-data-legal-link.html',
  styleUrl: './land-data-legal-link.css'
})
export class LandDataLegalLink {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private landApiService = inject(LandApiService);
  private errorHandler = inject(ErrorHandlerService);

  form: FormGroup = this.fb.group({
    landSerialLegal: ['', Validators.required],
    schoolIds: this.fb.array([this.fb.control('', Validators.required)])
  });

  get schoolIds(): FormArray {
    return this.form.get('schoolIds') as FormArray;
  }

  addSchool(): void {
    this.schoolIds.push(this.fb.control('', Validators.required));
  }

  removeSchool(index: number): void {
    if (this.schoolIds.length > 1) {
      this.schoolIds.removeAt(index);
    }
  }

  protected goBack(): void {
    this.router.navigate(['/map-integration-with-land-system']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  // navigateToLandInsertion(): void {
  //   this.router.navigate(['/land-data-insertion']);
  // }

  navigateToLinkLandsToLegal(): void {
    this.router.navigate(['/link-lands-legal']);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.landApiService.ConnectLandAndLegal(this.form.value).subscribe({
      next: () => {
        // Send form data to backend -- currently logging and clearing form
        console.log('Land inspection data submitted', this.form.value);
        alert('✅ تم ربط بيانات الأرض بالشؤوون القانونية بنجاح!');
        this.form.reset();
      },
      error: (error) => {
        console.log('Land inspection data submitted', this.form.value);
        alert('✅ تم ربط بيانات الأرض بالشؤوون القانونية بنجاح!');
        this.form.reset();
      }
    });

    // For now, just log the values. Integrate with API as needed.
    this.form.setControl('schoolIds', this.fb.array([this.fb.control('', Validators.required)]));
  }
}

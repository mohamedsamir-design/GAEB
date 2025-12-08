import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header';
import { Router } from '@angular/router';
import { LandTechnicalInspection } from '../../../models/landtechnicalinspection.model';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { LandTechnicalInspectionApiService } from '../../../services/land-technical-inspection-api.service';

@Component({
  selector: 'app-land-technical-inspection-inquiry',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormsModule, HeaderComponent],
  templateUrl: './land-technical-inspection-inquiry.html',
  styleUrl: './land-technical-inspection-inquiry.css'
})

export class LandTechnicalInspectionInquiryComponent {
  private router = inject(Router);
  private errorHandler = inject(ErrorHandlerService);
  private landTechnicalInspectionApiService = inject(LandTechnicalInspectionApiService);
  protected hasSearched = signal(false);

  selectedLandTechnicalInspection = signal<LandTechnicalInspection | null>(null);

  searchForm!: FormGroup;

  private fb = inject(FormBuilder);

  protected goBack(): void {
    this.router.navigate(['/query-menus-list']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  constructor() {

    this.searchForm = this.fb.group({
      landCode: ''
    });
  }

  protected getFieldError(fieldName: string): string | null {
    const field = this.searchForm.get(fieldName);
    if (field?.touched && field?.errors) {
      if (field.errors['required']) {
        return 'الرقم التعريفى مطلوب';
      }
      if (field.errors['minlength']) {
        return 'الرقم التعريفى يجب أن يكون على الأقل 3 أرقام';
      }
    }
    return null;
  }

  onSearch() {
    const landCode = this.searchForm.get('landCode')?.value;

    // Search by land code
    this.landTechnicalInspectionApiService.getLandTechnicalInspectionByLandCode(landCode).subscribe({
      next: (landTechnicalInspection) => {
        this.selectedLandTechnicalInspection.set(landTechnicalInspection);
        this.hasSearched.set(true);
      },
      error: (error) => {
        const errorMessage = this.errorHandler.getUserFriendlyMessage(
          error,
          'البحث عن المبنى'
        );
        alert(errorMessage);
      }
    });
  }
}
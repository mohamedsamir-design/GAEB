import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header';
import { Router } from '@angular/router';
import { LookupApiService } from '../../../services/lookup-api.service';
import { GovernorateData, LandOwnerData } from '../../../models/Lookup.Model';
import { LandTechnicalInspection } from '../../../models/landtechnicalinspection.model';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { LandTechnicalInspectionApiService } from '../../../services/land-technical-inspection-api.service';


type ViewMode = 'search' | 'view' | 'create' | 'edit';

@Component({
  selector: 'app-land-technical-inspection',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormsModule, HeaderComponent],
  templateUrl: './land-technical-inspection.html',
  styleUrl: './land-technical-inspection.css'
})

export class LandTechnicalInspectionComponent {
  private router = inject(Router);
  private lookupApiService = inject(LookupApiService);
  private errorHandler = inject(ErrorHandlerService);
  private landTechnicalInspectionApiService = inject(LandTechnicalInspectionApiService);

  selectedLandTechnicalInspection = signal<LandTechnicalInspection | null>(null);
  viewMode = signal<ViewMode>('search');

  //Lookup
  governorates: GovernorateData[] = []; // Declare an empty array of MyObject
  landOwners: LandOwnerData[] = []; // Declare an empty array of MyObject

  get boundariesGroup() {
    return this.form.get('boundaries') as FormGroup;
  }
  get lengthsGroup() {
    return this.form.get('lengths') as FormGroup;
  }
  private fb = inject(FormBuilder);

  protected goBack(): void {
    this.router.navigate(['/property-registration-list-insertions']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  constructor() {
    this.loadGovernorates();
    this.loadLandOwners();
  }

  form: FormGroup = this.fb.group({
    landCode: ['', Validators.required],
    governorateCode: ['', Validators.required],
    landAddress: ['', Validators.required],
    landOwnerName: ['', Validators.required],
    landOwnerAddress: ['', Validators.required],
    totalArea: ['', Validators.required],
    landNature: ['', Validators.required],
    landOwnershipCode: ['', Validators.required],

    // الحدود
    northernBoundary: ['', Validators.required],
    southernBoundary: ['', Validators.required],
    easternBoundary: ['', Validators.required],
    westernBoundary: ['', Validators.required],

    // الأطوال
    northernBoundaryLength: ['', Validators.required],
    southernBoundaryLength: ['', Validators.required],
    easternBoundaryLength: ['', Validators.required],
    westernBoundaryLength: ['', Validators.required],

    // الزوايا
    northeastBoundary: ['', Validators.required],
    northwestBoundary: ['', Validators.required],
    southeastBoundary: ['', Validators.required],
    southwestBoundary: ['', Validators.required],

    // أطوال الزوايا
    northeastBoundaryLength: ['', Validators.required],
    northwestBoundaryLength: ['', Validators.required],
    southeastBoundaryLength: ['', Validators.required],
    southwestBoundaryLength: ['', Validators.required],

    technicalResponsiblePersonId: ['', Validators.required],
    legalResponsiblePersonId: ['', Validators.required],
    needsCommitteeDate: ['', Validators.required],
    technicalInspectionDate: ['', Validators.required]
  });

  private loadLandOwners() {
    this.lookupApiService.getLandOwners().subscribe({
      next: (landOwnersList) => {
        // Guard against null and normalize the response to an array
        if (!landOwnersList) {
          this.landOwners = [];
          return;
        }
        this.landOwners = Array.isArray(landOwnersList) ? landOwnersList : [landOwnersList];
      },
      error: (error) => {
        const errorMessage = this.errorHandler.getUserFriendlyMessage(
          error,
          'تحميل المحافظات'
        );
        alert(errorMessage);
      }
    });
  }

  private loadGovernorates() {
    this.lookupApiService.getGovernorates().subscribe({
      next: (governoratesList) => {
        // Guard against null and normalize the response to an array
        if (!governoratesList) {
          this.governorates = [];
          return;
        }
        this.governorates = Array.isArray(governoratesList) ? governoratesList : [governoratesList];
      },
      error: (error) => {
        const errorMessage = this.errorHandler.getUserFriendlyMessage(
          error,
          'تحميل المحافظات'
        );
        alert(errorMessage);
      }
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.landTechnicalInspectionApiService.saveLandTechnicalInspection(this.form.value).subscribe({
      next: (landTechnicalInspection) => {
        this.selectedLandTechnicalInspection.set(landTechnicalInspection);
        this.viewMode.set('view');

        // Send form data to backend -- currently logging and clearing form
        console.log('Land inspection data submitted', this.form.value);
        alert('✅ تم حفظ بيانات المعاينة الفنية للأرض بنجاح!');
        this.form.reset();
      },
      error: (error) => {
        console.error('Error creating building:', error);
        const errorMessage = this.errorHandler.getUserFriendlyMessage(
          error,
          'إضافة المبنى'
        );
        alert(`❌ فشل في  إضافة معاينة فنية للأرض:\n${errorMessage}`);
      }
    });
  }
}
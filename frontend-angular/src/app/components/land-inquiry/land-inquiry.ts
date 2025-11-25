import { Component, signal, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandApiService } from '../../services/land-api.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { EducationalBuildingData } from '../../models/school-map.model';
import { LandData, BuildingLocationData } from '../../models/land.model';
import { Building } from '../../models/building.model';
import { GovernorateData } from '../../models/Lookup.Model';
import { SortByCodePipe } from '../../pipes/sort-by-code.pipe';
import { HeaderComponent } from '../shared/header/header';
import { LookupApiService } from '../../services/lookup-api.service';
import { BuildingApiService } from '../../services/building-api.service';

type ViewMode = 'search' | 'view' | 'create' | 'edit';

@Component({
  selector: 'app-land-inquiry',
  templateUrl: './land-inquiry.html',
  styleUrl: './land-inquiry.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, SortByCodePipe]
})
export class LandInquiryComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private fb = inject(FormBuilder);
  private landApiService = inject(LandApiService);
  private lookupApiService = inject(LookupApiService);
  private buildingApiService = inject(BuildingApiService);
  private errorHandler = inject(ErrorHandlerService);

  protected isSearching = signal(false);
  protected hasSearched = signal(false);
  protected landData = signal<LandData | null>(null);
  protected showFullData = signal(false);
  protected showFullDisplayPopup = signal(false);
  protected isLoadingBuilding = signal(false);
  protected buildingFullData = signal<Building | null>(null);

  //Popup signals
  protected showLandCoordinatesPopup = signal(false);
  protected showLandDataPopup = signal(false);
  protected showDataAvailabilityPopup = signal(false);
  protected showBuildingPopup = signal(false);
  protected buildingData = signal<BuildingLocationData[]>([]);

  //Lookup
  protected governorates = signal<GovernorateData[]>([]);

  selectedBuilding = signal<EducationalBuildingData | null>(null);
  viewMode = signal<ViewMode>('search');
  showModal = signal<boolean>(false);
  landForm!: FormGroup;
  searchForm!: FormGroup;

  constructor() {
    this.initializeForms();

    //Check if land reference number is provided in route
    const id = this.route.snapshot.paramMap.get('referenceNumber');
    if (id) {
      //this.loadLandByReferenceNumber(id);
    }
  }

  private initializeForms() {

    this.searchForm = this.fb.group({
      referenceNumber: ['', [Validators.required, Validators.minLength(3)]]
    });

    // Land form for create/edit - matching landing-basic-data fields
    this.landForm = this.fb.group({
      referenceNumber: ['', [Validators.required, Validators.maxLength(50)]],
      usageStatus: ['', [Validators.maxLength(50)]],
      headquarters: ['', [Validators.maxLength(100)]],
      approvalStatus: ['', [Validators.maxLength(50)]],
      identificationNumber: ['', [Validators.maxLength(50)]],
      centerDepartment: ['', [Validators.maxLength(100)]],
      totalArea: ['', [Validators.maxLength(18)]],
      phase: ['', [Validators.maxLength(50)]],
      approval: ['', [Validators.maxLength(100)]],
      housing: ['', [Validators.maxLength(100)]],
      committeePricing: ['', [Validators.maxLength(18)]],
      purchasePrice: ['', [Validators.maxLength(18)]],
      saleNegotiations: ['', [Validators.maxLength(255)]],
      landCode: ['', [Validators.maxLength(50)]],
      village: ['', [Validators.maxLength(100)]],
      currentOwner: ['', [Validators.maxLength(255)]],
      originalOwner: ['', [Validators.maxLength(255)]],
      model: ['', [Validators.maxLength(100)]],
      documents: ['', [Validators.maxLength(255)]],
      plan: ['', [Validators.maxLength(255)]],
      branchNotification: ['', [Validators.maxLength(255)]],
      realEstateStatus: ['', [Validators.maxLength(255)]],
      buildingBoundaries: ['', [Validators.maxLength(100)]],
      networkData: ['', [Validators.maxLength(100)]],
      landAreaFromTotal: ['', [Validators.maxLength(100)]],
      landUseDatabase: ['', [Validators.maxLength(100)]],
      landInspectionDatabase: ['', [Validators.maxLength(100)]],
      landReceiptDatabase: ['', [Validators.maxLength(100)]],
      paidAmountsDatabase: ['', [Validators.maxLength(100)]],
      landCoordinatesData: ['', [Validators.maxLength(100)]]
    });
  }


  protected onSearch(): void {
    if (this.searchForm.valid) {
      this.isSearching.set(true);

      const referenceNumber = this.searchForm.get('referenceNumber')?.value;

      // Use mock database service to fetch land data
      this.landApiService.getLandByReferenceNumber(referenceNumber).subscribe({
        next: (data) => {
          this.landData.set(data);
          this.hasSearched.set(true);
          this.isSearching.set(false);
        },
        error: (error) => {
          this.isSearching.set(false);
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'البحث عن بيانات الأرض'
          );
          alert(errorMessage);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onSelectBuilding(building: EducationalBuildingData) {
    this.selectedBuilding.set(building);
    this.viewMode.set('view');
    this.showModal.set(false);
  }

  onCancel() {
    if (this.selectedBuilding()) {
      this.viewMode.set('view');
    } else {
      this.viewMode.set('search');
    }
  }

  onCreateNew() {
    this.landForm.reset({
      referenceNumber: null,
      usageStatus: null,
      headquarters: null,
      approvalStatus: null,
      identificationNumber: null,
      centerDepartment: null,
      totalArea: null,
      phase: null,
      approval: null,
      housing: null,
      committeePricing: null,
      purchasePrice: null,
      saleNegotiations: null,
      landCode: null,
      village: null,
      currentOwner: null,
      originalOwner: null,
      model: null,
      documents: null,
      plan: null,
      branchNotification: null,
      realEstateStatus: null,
      buildingBoundaries: null,
      networkData: null,
      landAreaFromTotal: null,
      landUseDatabase: null,
      landInspectionDatabase: null,
      landReceiptDatabase: null,
      paidAmountsDatabase: null,
      landCoordinatesData: null
    });
    this.viewMode.set('create');
  }

  protected onReset(): void {
    this.searchForm.reset();
    this.landData.set(null);
    this.hasSearched.set(false);
    this.showFullData.set(false);
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'referenceNumber': 'رقم المرجع',
      'usageStatus': 'موقف الاستخدام',
      'headquarters': 'المقر',
      'approvalStatus': 'حالة الموافقة',
      'identificationNumber': 'الرقم التعريفي',
      'centerDepartment': 'المركز/القسم',
      'totalArea': 'المساحة الكلية',
      'phase': 'المرحلة',
      'approval': 'الاعتماد',
      'housing': 'التسكين',
      'committeePricing': 'تسعير اللجنة',
      'purchasePrice': 'سعر الشراء',
      'saleNegotiations': 'مفاوضات البيع',
      'landCode': 'كود الأرض',
      'village': 'القرية',
      'currentOwner': 'المالك الحالي',
      'originalOwner': 'المالك الأصلي',
      'model': 'النموذج',
      'documents': 'الوثائق / المستندات',
      'plan': 'الخطة',
      'branchNotification': 'إخطار الفرع',
      'realEstateStatus': 'موقف العقارية',
      'buildingBoundaries': 'حدود قطعة الأرض',
      'networkData': 'بيانات الميزانية الشبكية',
      'networkObservations': 'ملاحظات الميزانية الشبكية',
      'landAreaFromTotal': 'مساحة الأرض من الإجمالي',
      'landUseDatabase': 'قاعدة بيانات استخدام الأراضي',
      'landInspectionDatabase': 'ملاحظات معاينة قطعة الارض',
      'landConstructionObstacles': 'معوقات البناء بالأرض',
      'landCreationObstacles': 'عوائق إنشاء قطعة الارض',
      'landConstructionData': 'مستندات قطعة الارض',
      'landReceiptDatabase': 'موقف استلام قطعة الارض',
      'paidAmountsDatabase': 'المبالغ المدفوعة للأرض',
      'decisionData': 'بيانات قرار التخصيص',
      'landCommittees': 'لجان قطعة الارض',
      'landFacilities': 'مرافق قطعة الارض',
      'landCoordinatesData': 'احداثيات قطعة الارض',
      'educationalStudies': 'الدراسات التربوية',
      'landReviewCommittees': 'لجان مراجعة قطعة الارض'
    };
    return labels[fieldName] || fieldName;
  }

  onSave() {
    if (this.landForm.invalid) {
      this.markFormGroupTouched();

      // Collect all invalid fields
      const invalidFields: string[] = [];
      Object.keys(this.landForm.controls).forEach(key => {
        const control = this.landForm.get(key);
        if (control?.invalid) {
          invalidFields.push(this.getFieldLabel(key));
        }
      });

      alert(`❌ يرجى تصحيح الأخطاء في الحقول التالية:\n\n${invalidFields.join('\n')}`);
      return;
    }

    const formData = this.landForm.value;

    // Convert numeric fields from strings to numbers or null
    const numericFields = ['totalArea'];
    const conversionErrors: string[] = [];

    numericFields.forEach(field => {
      const value = formData[field];
      if (value === '' || value === null || value === undefined) {
        formData[field] = null;
      } else {
        const numValue = Number(value);
        if (isNaN(numValue)) {
          conversionErrors.push(this.getFieldLabel(field));
        } else {
          formData[field] = numValue;
        }
      }
    });

    if (conversionErrors.length > 0) {
      alert(`❌ القيم المدخلة في الحقول التالية غير صحيحة. يرجى إدخال أرقام صحيحة:\n\n${conversionErrors.join('\n')}`);
      return;
    }
  }

  protected goBack(): void {
    this.location.back();
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  protected openBuildingInquiry(): void {
    const landId = this.landData()?.id;
    if (landId) {
      // Use mock database service to fetch building locations
      this.landApiService.getBuildingLocationsByLandId(landId).subscribe({
        next: (buildings) => {
          this.buildingData.set(buildings);
          this.showBuildingPopup.set(true);
        },
        error: (error) => {
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'تحميل بيانات المباني'
          );
          alert(errorMessage);
        }
      });
    }
  }

  protected closeBuildingPopup(): void {
    this.showBuildingPopup.set(false);
  }

  protected navigateToLandData(): void {
    // Open land data popup
    this.showLandDataPopup.set(true);
  }

  protected navigateToDataAvailability(): void {
    // Open data availability popup
    this.showDataAvailabilityPopup.set(true);
  }

  protected closeDataAvailabilityPopup(): void {
    this.showDataAvailabilityPopup.set(false);
  }

  protected navigateToLandCoordinates(): void {
    // Open land coordinates popup
    this.showLandCoordinatesPopup.set(true);
  }

  protected navigateToBuildingInquiry(): void {
    // Open building inquiry popup
    this.openBuildingInquiry();
  }

  protected closeLandCoordinatesPopup(): void {
    this.showLandCoordinatesPopup.set(false);
  }

  protected closeLandDataPopup(): void {
    this.showLandDataPopup.set(false);
  }

  protected showFullDisplay(): void {
    // For now, use a default building number since BuildingLocations
    // are land boundaries, not actual building references
    // TODO: Add proper Land-to-Building relationship in the database
    const defaultBuildingNumber = '601234'; // مدرسة النيل الابتدائية

    this.loadBuildingFullData(defaultBuildingNumber);
  }

  private loadBuildingFullData(buildingNumber: string): void {
    this.isLoadingBuilding.set(true);
    this.buildingApiService.getBuildingByNumber(buildingNumber).subscribe({
      next: (building) => {
        this.buildingFullData.set(building);
        this.showFullDisplayPopup.set(true);
        this.isLoadingBuilding.set(false);
      },
      error: (error) => {
        this.isLoadingBuilding.set(false);
        const errorMessage = this.errorHandler.getUserFriendlyMessage(
          error,
          'تحميل بيانات المبنى الكاملة'
        );
        alert(errorMessage);
      }
    });
  }

  protected closeFullDisplayPopup(): void {
    this.showFullDisplayPopup.set(false);
    this.buildingFullData.set(null);
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

  private markFormGroupTouched(): void {
    Object.keys(this.searchForm.controls).forEach(key => {
      this.searchForm.get(key)?.markAsTouched();
    });
  }
}
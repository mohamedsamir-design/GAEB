import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { LookupApiService } from '../../../services/lookup-api.service';
import { BuildingApiService } from '../../../services/building-api.service';
import { DistrictData, VillageData, LandOwnerData } from '../../../models/Lookup.Model';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { SchoolMapApiService } from '../../../services/school-map-api.service';

@Component({
  selector: 'app-main-data-for-school-insertion',
  imports: [ReactiveFormsModule, HeaderComponent, NgIf],
  templateUrl: './main-data-for-school-insertion.html',
  styleUrl: './main-data-for-school-insertion.css'
})

export class MainDataForSchoolInsertion {
  private router = inject(Router);
  private lookupApiService = inject(LookupApiService);
  private errorHandler = inject(ErrorHandlerService);
  private buildingApiService = inject(BuildingApiService);
  private schoolMapService = inject(SchoolMapApiService);

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

  //Lookup
  districts: DistrictData[] = []; // Declare an empty array of MyObject
  villages: VillageData[] = [];
  landOwners: LandOwnerData[] = [];

  constructor(private fb: FormBuilder) {

    this.loadDistricts();
    this.loadLandOwners();

    this.landForm = this.fb.group({
      buildingNumber: ['', Validators.required],
      buildingName: ['', Validators.required],
      districtId: ['', Validators.required],
      villageId: ['', Validators.required],
      subVillage: ['', Validators.required],
      totalArea: ['', Validators.required],
      landOwnership: ['', Validators.required],
    });
  }

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

  getVillagesByDistrictNumber(districtNumber: number) {
    this.lookupApiService.GetVillagesByDistrictNumber(districtNumber).subscribe({
      next: (villagesList) => {
        // Guard against null and normalize the response to an array
        if (!villagesList) {
          this.villages = [];
          return;
        }
        this.villages = Array.isArray(villagesList) ? villagesList : [villagesList];
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

  loadDistricts() {
    this.lookupApiService.getDistricts().subscribe({
      next: (districtsList) => {
        // Guard against null and normalize the response to an array
        if (!districtsList) {
          this.districts = [];
          return;
        }
        this.districts = Array.isArray(districtsList) ? districtsList : [districtsList];
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

  submit() {
    if (this.landForm.invalid) {
      this.landForm.markAllAsTouched();
      return;
    }

    this.schoolMapService.createEducationalBuilding(this.landForm.value).subscribe({
      next: (landTechnicalInspection) => {

        // Send form data to backend -- currently logging and clearing form
        console.log('Land inspection data submitted', this.landForm.value);
        alert('✅ تم حفظ البيانات الأساسية لقطعة الأرض بنجاح!');
        this.landForm.reset();
      },
      error: (error) => {
        console.error('Error creating building:', error);
        const errorMessage = this.errorHandler.getUserFriendlyMessage(
          error,
          'إضافة المبنى'
        );
        alert(`❌ فشل في حفظ البيانات الأساسية لقطعة الأرض بنجاح:\n${errorMessage}`);
      }
    });

    console.log('Form Data:', this.landForm.value);
  }
}

import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';
import { SchoolMapApiService } from '../../services/school-map-api.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-school-map-roads',
  templateUrl: './school-map-roads.html',
  styleUrl: './school-map-roads.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolMapRoadsComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private schoolMapService = inject(SchoolMapApiService);
  private errorHandler = inject(ErrorHandlerService);

  roadsForm!: FormGroup;

  // Lookup data for dropdowns
  mainRoadTypes = [
    { code: 'طريق سريع', name: 'طريق سريع' },
    { code: 'طريق رئيسي', name: 'طريق رئيسي' },
    { code: 'طريق فرعي', name: 'طريق فرعي' }
  ];

  movementDirections = [
    { code: 'شمال', name: 'شمال' },
    { code: 'جنوب', name: 'جنوب' },
    { code: 'شرق', name: 'شرق' },
    { code: 'غرب', name: 'غرب' }
  ];

  roadConditions = [
    { code: 'ممتاز', name: 'ممتاز' },
    { code: 'جيد', name: 'جيد' },
    { code: 'مقبول', name: 'مقبول' },
    { code: 'يحتاج صيانة', name: 'يحتاج صيانة' }
  ];

  constructor() {
    this.roadsForm = this.fb.group({
      buildingId: ['', Validators.required],
      roadName: ['', Validators.required],
      roadType: ['', Validators.required],
      roadWidth: ['', [Validators.required, Validators.min(0)]],
      direction: ['', Validators.required],
      condition: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.roadsForm.valid) {
      const formData = this.roadsForm.value;
      
      const roadData = {
        buildingId: formData.buildingId,
        roadName: formData.roadName || '',
        roadType: formData.roadType,
        roadWidth: parseFloat(formData.roadWidth) || 0,
        direction: formData.direction,
        condition: formData.condition
      };
      
      // Save to database
      this.schoolMapService.addSchoolRoad(roadData as any).subscribe({
        next: (saved: any) => {
          console.log('Road data saved:', saved);
          alert('✅ تم حفظ بيانات الطرق بنجاح');
          this.roadsForm.reset();
        },
        error: (error: any) => {
          console.error('Error saving road data:', error);
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'حفظ بيانات الطرق'
          );
          alert(errorMessage);
        }
      });
    } else {
      this.markFormGroupTouched(this.roadsForm);
    }
  }

  onReset() {
    this.roadsForm.reset();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getMainRoadTypeName(code: string): string {
    return this.mainRoadTypes.find(t => t.code === code)?.name || '';
  }

  getMovementDirectionName(code: string): string {
    return this.movementDirections.find(d => d.code === code)?.name || '';
  }

  getRoadConditionName(code: string): string {
    return this.roadConditions.find(c => c.code === code)?.name || '';
  }

  navigateBack() {
    this.router.navigate(['/school-map-inquiry']);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}

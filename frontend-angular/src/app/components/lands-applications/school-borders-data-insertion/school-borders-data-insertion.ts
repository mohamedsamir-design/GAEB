import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header';
import { Router } from '@angular/router';

interface Border {
  name: string;
  length: number;
  available: boolean;
  neighborLevel: string;
  neighborDescription: string;
  fenceRequired: boolean;
}

@Component({
  selector: 'school-borders-data-insertion',
  templateUrl: './school-borders-data-insertion.html',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent
  ],
  styleUrls: ['./school-borders-data-insertion.css']
})
export class BordersComponent {
  searchForm: FormGroup;
  borders: Border[] = [];
  borderForm: FormGroup;
  showModal = false;
  editingIndex: number | null = null;

  borderNames = ['الحد الأول', 'الحد الثاني', 'الحد الثالث'];

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

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      buildingNumber: ['']
    });

    this.borderForm = this.fb.group({
      name: [''],
      length: [''],
      available: [true],
      neighborLevel: [''],
      neighborDescription: [''],
      fenceRequired: [false]
    });
  }

  search() {
    const buildingNumber = this.searchForm.value.buildingNumber;
    // Mock data; replace with API call
    this.borders = [
      {
        name: 'الحد الأول',
        length: 20,
        available: true,
        neighborLevel: 'ممتاز',
        neighborDescription: 'جار جيد',
        fenceRequired: true
      },
      {
        name: 'الحد الثاني',
        length: 15,
        available: false,
        neighborLevel: 'متوسط',
        neighborDescription: 'جار مشغول',
        fenceRequired: false
      }
    ];
  }

  openModal(border?: Border, index?: number) {
    if (border) {
      this.borderForm.patchValue(border);
      this.editingIndex = index!;
    } else {
      this.borderForm.reset({ available: true, fenceRequired: false });
      this.editingIndex = null;
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submitBorder() {
    const newBorder = this.borderForm.value;
    if (this.editingIndex !== null) {
      this.borders[this.editingIndex] = newBorder;
    } else {
      this.borders.push(newBorder);
    }
    this.closeModal();
  }
}

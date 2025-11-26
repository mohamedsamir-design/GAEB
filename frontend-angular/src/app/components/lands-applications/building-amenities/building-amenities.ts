import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Amenity } from '../../../models/amenity.model';

@Component({
  selector: 'app-building-amenities',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './building-amenities.html',
  styleUrl: './building-amenities.css'
})
export class BuildingAmenities {
 buildingNumber: string = '';
  hasSearched: boolean = false;
  amenities: Amenity[] = [];

  // Example search function
  searchAmenities() {
    if (!this.buildingNumber) return;

    // Example: fetch from API instead of hardcoded
    this.amenities = [
      { id: '1', name: 'مصعد', description: 'مصعد حديث', buildingName: 'مدرسة النور', buildingNumber: '1' },
      { id: '2', name: 'موقف سيارات', description: 'موقف خارجي', buildingName: 'مدرسة النور', buildingNumber: '2' }
    ].filter(a => a.buildingNumber.includes(this.buildingNumber)); // example filter

    this.hasSearched = true;
  }

  deleteAmenity(amenity: Amenity) {
    // TODO: call API to delete
    this.amenities = this.amenities.filter(a => a.id !== amenity.id);
  }
  constructor() {}

  private router = inject(Router);

  isModalOpen = false;
availableAmenities: any[] = [
  { id: '1', name: 'مصعد', description: 'مصعد حديث - سعة 10 أشخاص', selected: false },
  { id: '2', name: 'موقف سيارات', description: 'موقف خارجي وداخلي', selected: false },
  { id: '3', name: 'مكيف هواء', description: 'تكييف مركزي', selected: false },
  { id: '4', name: 'إنترنت لاسلكي', description: 'Wi-Fi عالي السرعة', selected: false },
  { id: '5', name: 'كاميرات مراقبة', description: 'نظام مراقبة 24/7', selected: false },
  { id: '6', name: 'مسبح', description: 'مسبح داخلي', selected: false },
  { id: '7', name: 'صالة رياضية', description: 'مجهزة بالكامل', selected: false },
];

openAddModal() {
  this.isModalOpen = true;
}

closeModal() {
  this.isModalOpen = false;
  // إلغاء التحديد عند الإغلاق
  this.availableAmenities.forEach(a => a.selected = false);
}

onAmenitySelect(item: any) {
  // يمكنك إضافة منطق هنا
}

hasSelectedAmenities(): boolean {
  return this.availableAmenities.some(a => a.selected);
}

confirmAddAmenities() {
  const selected = this.availableAmenities.filter(a => a.selected);
  if (selected.length > 0) {
    this.closeModal();
    // هنا يمكنك إرسال الطلب للـ API
    alert(`تم إضافة ${selected.length} مرفق بنجاح!`);
  }
}

  protected goBack(): void {
    this.router.navigate(['/lands-main-menu']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }


  addAmenity() {
    // You can open a modal or navigate to a form page
    console.log("Add Amenity Clicked");
  }
}

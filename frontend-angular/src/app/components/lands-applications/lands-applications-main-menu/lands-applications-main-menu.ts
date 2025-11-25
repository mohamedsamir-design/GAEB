import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-lands-applications-main-menu',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './lands-applications-main-menu.html',
  styleUrl: './lands-applications-main-menu.css'
})
export class LandsApplicationsMainMenu {
    private router = inject(Router);

    showMetadataModal = false;

openMetadataModal() {
  this.showMetadataModal = true;
}

closeMetadataModal() {
  this.showMetadataModal = false;
}

navigateTo(type: string) {
  this.closeMetadataModal();

  switch (type) {
    case 'boundaries':
      this.router.navigate(['/land/boundaries']);
      break;

    case 'building-amenities':
      this.router.navigate(['/building-amenities']);
      break;

    case 'coordinates':
      this.router.navigate(['/land/coordinates']);
      break;
  }
}

  protected goBack(): void {
    this.router.navigate(['/lands']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }
  navigateToBasicLandData() {
    // Route to: تسجيل البيانات الأساسية لقطع الأراضي
    this.router.navigate(['/login']);
  }

  navigateToLandMetadata() {
    // Route to: تسجيل البيانات الوصفية لقطع الأراضي
  }
}

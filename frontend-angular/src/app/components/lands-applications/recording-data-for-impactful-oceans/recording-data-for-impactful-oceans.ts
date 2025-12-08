import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-lands-applications-main-menu',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './recording-data-for-impactful-oceans.html',
  styleUrls: ['./recording-data-for-impactful-oceans.css']
})
export class RecordingDataForImpactfulOceans {
  private router = inject(Router);

  showMetadataModal = false;

  openMetadataModal() {
    this.showMetadataModal = true;
  }

  closeMetadataModal() {
    this.showMetadataModal = false;
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
  navigateToDocumentsData() {
    // Route to: تسجيل البيانات الأساسية لقطع الأراضي
    this.router.navigate(['/documentsData']);
  }
}
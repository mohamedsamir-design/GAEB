import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-property-registration-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './query-menus-list.html',
  styleUrl: './query-menus-list.css'
})

export class QueryMenusListComponent {
  private readonly router = inject(Router);

  protected goBack(): void {
    this.router.navigate(['/database-operations-home']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  navigateToLandTechnicalInspectionInquiry(): void {
    this.router.navigate(['/land-technical-inspection-inquiry']);
  }
}

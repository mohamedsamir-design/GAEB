import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-property-registration-list-insertions',
  imports: [CommonModule, HeaderComponent ],
  templateUrl: './property-registration-list-insertions.html',
  styleUrl: './property-registration-list-insertions.css'
})
export class PropertyRegistrationListInsertions {
  private readonly router = inject(Router);

  protected goBack(): void {
    this.router.navigate(['/property-registration-list']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  navigateToLandTechnicalInspection(): void {
    this.router.navigate(['/land-technical-inspection']);
  }

  navigateToLinkLandsToMap(): void {
    this.router.navigate(['/map-integration-with-land-system']);
  }
}

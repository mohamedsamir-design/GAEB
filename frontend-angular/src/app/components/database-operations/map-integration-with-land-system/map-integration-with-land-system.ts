import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-map-integration-with-land-system',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './map-integration-with-land-system.html',
  styleUrl: './map-integration-with-land-system.css'
})
export class MapIntegrationWithLandSystem {
  private readonly router = inject(Router);

  protected goBack(): void {
    this.router.navigate(['/property-registration-list-insertions']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  // navigateToLandInsertion(): void {
  //   this.router.navigate(['/land-data-insertion']);
  // }

  navigateToLinkLandsToLegal(): void {
    this.router.navigate(['/land-data-legal-link']);
  }
}

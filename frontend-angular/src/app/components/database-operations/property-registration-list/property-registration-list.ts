import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-property-registration-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './property-registration-list.html',
  styleUrl: './property-registration-list.css'
})
export class PropertyRegistrationList {
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

  navigateToQueryMenusList(): void {
    this.router.navigate(['/query-menus-list']);
  }
  
  navigateToPropertyInsertions(): void {
    this.router.navigate(['/property-registration-list-insertions']);
  }
}

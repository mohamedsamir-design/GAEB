import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-database-operations-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './database-operations-home.html',
  styleUrl: './database-operations-home.css'
})
export class DatabaseOperationsHome {
  protected navigateToPropertyRegistrationList(): void {
    this.router.navigate(['/property-registration-list']);
  }
  private router = inject(Router);

  protected goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }
}

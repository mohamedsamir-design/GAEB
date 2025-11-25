import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-lands-applications-home',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './lands-applications-home.html',
  styleUrl: './lands-applications-home.css'
})
export class LandsApplicationsHome {
  protected navigateToLandsMainMenu(): void {
    this.router.navigate(['/lands-main-menu']);
  }
  private router = inject(Router);

  protected goBack(): void {
    this.router.navigate(['/applications']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }
}

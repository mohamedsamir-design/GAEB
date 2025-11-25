import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-building-amenities',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './building-amenities.html',
  styleUrl: './building-amenities.css'
})
export class BuildingAmenities {
  buildingNumber: string = '';
  buildingName: string = '';

  amenities: any[] = [];
  hasSearched = false;

  constructor() {}

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

  searchAmenities() {
    if (!this.buildingNumber && !this.buildingName) return;

    // this.amenitiesService
    //   .getAmenities(this.buildingNumber, this.buildingName)
    //   .subscribe((res) => {
    //     this.amenities = res;
    //     this.hasSearched = true;
    //   });
  }

  addAmenity() {
    // You can open a modal or navigate to a form page
    console.log("Add Amenity Clicked");
  }
}

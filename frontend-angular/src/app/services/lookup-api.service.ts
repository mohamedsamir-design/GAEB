import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GovernorateData, LandOwnerData, DistrictData, VillageData } from '../models/Lookup.Model';
import { environment } from '../../environments/environment.development';
import { ErrorHandlerService } from './error-handler.service';

/**
 * Lookup API Service
 * Handles HTTP requests for land-related data
 * Replaces MockLandDatabaseService with real database integration
 * 
 * Backend Route: api/lands (matches LandsController)
 */
@Injectable({
  providedIn: 'root'
})
export class LookupApiService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly baseUrl = `${environment.apiUrl}/api/Lookup`;
  
  /**
   * Get all governorates in the database
   * Backend: GET api/lookup/getGovernorates
   */
  getGovernorates(): Observable<GovernorateData | null> {
    return this.http.get<GovernorateData | null>(`${this.baseUrl}/GetGovernorates`).pipe(
      tap(data => console.log(`Fetched governorate data`)),
      catchError(error => this.errorHandler.handleError(error, `فشل تحميل المحافظات`))
    );
  }

  /**
   * Get all districts in the database
   * Backend: GET api/lookup/getDistricts
   */
  getDistricts(): Observable<DistrictData | null> {
    return this.http.get<DistrictData | null>(`${this.baseUrl}/GetDistricts`).pipe(
      tap(data => console.log(`Fetched district data`)),
      catchError(error => this.errorHandler.handleError(error, `فشل تحميل المراكز`))
    );
  }

  
  /**
   * Get all districts in the database
   * Backend: GET api/lookup/getDistricts
   */
  GetVillagesByDistrictNumber(districtNumber: number): Observable<VillageData | null> {
    return this.http.get<VillageData | null>(`${this.baseUrl}/GetVillagesByDistrictNumber/${districtNumber}`).pipe(
      tap(data => console.log(`Fetched villages data`)),
      catchError(error => this.errorHandler.handleError(error, `فشل تحميل القرى`))
    );
  }

   /**
   * Get all governorates in the database
   * Backend: GET api/lookup/getGovernorates
   */
  getLandOwners(): Observable<LandOwnerData | null> {
    return this.http.get<LandOwnerData | null>(`${this.baseUrl}/GetLandOwners`).pipe(
      tap(data => console.log(`Fetched landOwner data`)),
      catchError(error => this.errorHandler.handleError(error, `فشل تحميل المحافظات`))
    );
  }
}
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LandTechnicalInspection } from '../models/landtechnicalinspection.model';
import { environment } from '../../environments/environment.development';
import { ErrorHandlerService } from './error-handler.service';

/**
 * Land API Service
 * Handles HTTP requests for land-related data
 * Replaces MockLandDatabaseService with real database integration
 * 
 * Backend Route: api/lands (matches LandsController)
 */
@Injectable({
  providedIn: 'root'
})
export class LandTechnicalInspectionApiService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly baseUrl = `${environment.apiUrl}/api/LandTechnicalInspection`;

  /**
   * Get all lands
   * Backend: GET api/lands
   */
  getAllLandTechnicalInspections(): Observable<LandTechnicalInspection[]> {
    return this.http.get<LandTechnicalInspection[]>(this.baseUrl).pipe(
      tap(data => console.log(`Fetched ${data.length} lands`)),
      catchError(error => this.errorHandler.handleError(error, 'تحميل استعلام فني الأراضي'))
    );
  }

  /**
   * Get landTechnicalInspection by ID
   * Backend: GET api/LandTechnicalInspection/{id}
   */
  getLandTechnicalInspectionByLandCode(landCode: string): Observable<LandTechnicalInspection> {
    try {
      this.errorHandler.validateString(landCode, 'كود قطعة الأرض');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'getLandTechnicalInspectionByLandCode');
      return throwError(() => error);
    }

    return this.http.get<LandTechnicalInspection>(`${this.baseUrl}/GetByLandCode/${landCode}`).pipe(
      tap(data => console.log(`Fetched landTechnicalInspection by landCode : ${landCode}`, data)),
      catchError(error => this.errorHandler.handleError(error, `تحميل بيانات الأرض`))
    );
  }

  /**
   * Create or update land data
   */
  saveLandTechnicalInspection(landTechnicalInspection: LandTechnicalInspection): Observable<LandTechnicalInspection> {
    const operation = landTechnicalInspection.id ? 'تحديث' : 'إضافة';
    if (landTechnicalInspection.id) {
      return this.http.put<LandTechnicalInspection>(`${this.baseUrl}/${landTechnicalInspection.id}`, landTechnicalInspection).pipe(
        catchError(error => this.errorHandler.handleError(error, `${operation} بيانات المعاينة الفني للأراضي `))
      );
    } else {
      return this.http.post<LandTechnicalInspection>(this.baseUrl, landTechnicalInspection).pipe(
        catchError(error => this.errorHandler.handleError(error, `${operation} بيانات المعاملة الفنية للأراضي`))
      );
    }
  }
}

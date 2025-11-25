import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  username: string;
  email?: string;
  fullName?: string;
  role?: string;
  programId?: string;
  programName?: string;
  menuId?: string;
  menuName?: string;
  libraryId?: string;
  libraryName?: string;
}

export interface UserProgram {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface UserMenu {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface UserLibrary {
  id: string;
  name: string;
  location?: string;
  description?: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly baseUrl = `${environment.apiUrl}/api/auth`;
  
  // Signals for reactive state
  private currentUserSignal = signal<LoginResponse | null>(null);
  private isAuthenticatedSignal = signal<boolean>(false);
  
  // Public readonly signals
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();

  constructor() {
    // Check if user is already logged in (from localStorage)
    this.loadUserFromStorage();
  }

  /**
   * Login with username and password
   */
  login(username: string, password: string): Observable<LoginResponse> {
    const request: LoginRequest = { username, password };
    
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, request).pipe(
      tap(response => {
        this.setCurrentUser(response);
        console.log('Login successful:', response);
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Logout current user
   */
  logout(): void {
    this.clearCurrentUser();
    this.router.navigate(['/login']);
  }

  /**
   * Get all programs
   */
  getPrograms(): Observable<UserProgram[]> {
    return this.http.get<UserProgram[]>(`${this.baseUrl}/programs`);
  }

  /**
   * Get all menus
   */
  getMenus(): Observable<UserMenu[]> {
    return this.http.get<UserMenu[]>(`${this.baseUrl}/menus`);
  }

  /**
   * Get all libraries
   */
  getLibraries(): Observable<UserLibrary[]> {
    return this.http.get<UserLibrary[]>(`${this.baseUrl}/libraries`);
  }

  /**
   * Update user selections (program, menu, library)
   */
  updateUserSelections(userId: string, programId?: string, menuId?: string, libraryId?: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${userId}/selections`, {
      programId,
      menuId,
      libraryId
    }).pipe(
      tap(() => {
        // Update current user in memory
        const currentUser = this.currentUserSignal();
        if (currentUser) {
          this.currentUserSignal.set({
            ...currentUser,
            programId,
            menuId,
            libraryId
          });
          this.saveUserToStorage(this.currentUserSignal()!);
        }
      })
    );
  }

  /**
   * Check if user has a specific role
   */
  hasRole(role: string): boolean {
    const user = this.currentUserSignal();
    return user?.role === role;
  }

  /**
   * Check if user is admin
   */
  isAdmin(): boolean {
    return this.hasRole('Admin');
  }

  /**
   * Check if user is manager
   */
  isManager(): boolean {
    return this.hasRole('Manager');
  }

  /**
   * Get user's full name or username
   */
  getUserDisplayName(): string {
    const user = this.currentUserSignal();
    return user?.fullName || user?.username || 'مستخدم';
  }

  // Private helper methods

  private setCurrentUser(user: LoginResponse): void {
    this.currentUserSignal.set(user);
    this.isAuthenticatedSignal.set(true);
    this.saveUserToStorage(user);
  }

  private clearCurrentUser(): void {
    this.currentUserSignal.set(null);
    this.isAuthenticatedSignal.set(false);
    this.removeUserFromStorage();
  }

  private saveUserToStorage(user: LoginResponse): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('currentUser');
    const isAuth = localStorage.getItem('isAuthenticated');
    
    if (userJson && isAuth === 'true') {
      try {
        const user = JSON.parse(userJson) as LoginResponse;
        this.currentUserSignal.set(user);
        this.isAuthenticatedSignal.set(true);
      } catch (error) {
        console.error('Error loading user from storage:', error);
        this.removeUserFromStorage();
      }
    }
  }

  private removeUserFromStorage(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
  }
}

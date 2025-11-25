import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Auth Guard - Protects routes that require authentication
 * Usage: Add to route definition: canActivate: [authGuard]
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirect to login page with return url
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

/**
 * Admin Guard - Protects routes that require Admin role
 * Usage: Add to route definition: canActivate: [adminGuard]
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.isAdmin()) {
    return true;
  }

  // Redirect to dashboard if not admin
  router.navigate(['/dashboard']);
  return false;
};

/**
 * Manager Guard - Protects routes that require Manager or Admin role
 * Usage: Add to route definition: canActivate: [managerGuard]
 */
export const managerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && (authService.isAdmin() || authService.isManager())) {
    return true;
  }

  // Redirect to dashboard if not manager or admin
  router.navigate(['/dashboard']);
  return false;
};

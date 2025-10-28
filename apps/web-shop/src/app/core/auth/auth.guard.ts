import { Injectable } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      // Check for required roles
      const requiredRoles = route.data['roles'] as Array<string>;
      if (requiredRoles && requiredRoles.length > 0) {
        const user = this.authService.getCurrentUserSync();
        if (user && requiredRoles.includes(user.role)) {
          return true;
        } else {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      }
      return true;
    }

    // Store the attempted URL for redirecting after login
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  const authService = (route.injector.get as any)(AuthService);
  const router = (route.injector.get as any)(Router);
  
  if (authService.isAuthenticated()) {
    const requiredRoles = route.data['roles'] as Array<string>;
    if (requiredRoles && requiredRoles.length > 0) {
      const user = authService.getCurrentUserSync();
      if (user && requiredRoles.includes(user.role)) {
        return true;
      } else {
        router.navigate(['/unauthorized']);
        return false;
      }
    }
    return true;
  }

  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

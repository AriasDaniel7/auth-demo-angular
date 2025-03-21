import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { delay, map } from 'rxjs';

export const isAuthenticatedLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService
    .checkToken()
    .pipe(
      map(() =>
        authService.authStatusLogin() === AuthStatus.authenticated
          ? router.createUrlTree(['/dashboard'])
          : true
      )
    );
};

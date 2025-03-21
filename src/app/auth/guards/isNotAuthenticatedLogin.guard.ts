import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { map } from 'rxjs';

export const isNotAuthenticatedLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService
    .checkToken()
    .pipe(
      map(() =>
        authService.authStatusLogin() !== AuthStatus.authenticated
          ? router.createUrlTree(['/login'])
          : true
      )
    );
};

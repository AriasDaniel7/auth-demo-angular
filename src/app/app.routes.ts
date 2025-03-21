import { Routes } from '@angular/router';
import { isAuthenticatedLoginGuard } from './auth/guards/isAuthenticatedLogin.guard';
import { isNotAuthenticatedLoginGuard } from './auth/guards/isNotAuthenticatedLogin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
    canActivate: [isAuthenticatedLoginGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./auth/pages/dashboard-page/dashboard-page.component').then(
        (m) => m.DashboardPageComponent
      ),
    canActivate: [isNotAuthenticatedLoginGuard],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component')
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./components/home/home.component')
  },
  {
    path: '**',
    redirectTo: '/login'
  } 
];

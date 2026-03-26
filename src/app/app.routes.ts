import { Routes } from '@angular/router';
import { AppLayout } from './shared/layout/app-layout/app-layout';
import { AuthGuard } from './core/guards/auth-guard';
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
  {
    path: 'signup',
    component: Signup,
    title: 'Signup',
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: AppLayout,
    canActivate: [AuthGuard],
    title: 'Dashboard',
    children: [],
  },


  // {
  //   path: '**',
  //   component: NotFoundComponent,
  //   title: 'Página no encontrada',
  // },
];

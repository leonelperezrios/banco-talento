import { Routes } from '@angular/router';
import { PersonalInfo } from './personal-info/pages/personal-info/personal-info';

export const applicantRoutes: Routes = [
  {
    path: 'informacion-personal/:id',
    component: PersonalInfo,
    title: 'Informacion personal - Banco de Talento',
  },
  {
    path: 'informacion-personal',
    component: PersonalInfo,
    title: 'Informacion personal - Banco de Talento',
  },
  {
    path: '',
    redirectTo: 'informacion-personal',
    pathMatch: 'full',
  },
];

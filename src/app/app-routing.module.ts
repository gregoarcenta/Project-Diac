import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/login/guards/auth.guard';
import { LoginGuard } from './modules/login/guards/login.guard';

import { LoginComponent } from './modules/login/page/login/login.component';


const routes: Routes = [

  /*   {
      path: 'dashboard',
      redirectTo: '/dashboard/estudiante',
      pathMatch: 'full',
    }, */
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

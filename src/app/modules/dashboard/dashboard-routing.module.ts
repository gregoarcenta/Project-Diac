import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestrezaComponent } from '../destreza/page/destreza/destreza.component';
import { EstudianteComponent } from '../estudiante/page/estudiante/estudiante.component';
import { EstudianteListComponent } from '../estudiante-list/page/estudiante-list/estudiante-list.component';
import { DefaultDashboardComponent } from './default-dashboard/default-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultDashboardComponent,
    children: [
      {
        path: 'destreza',
        component: DestrezaComponent
      },
      {
        path: 'estudiante',
        component: EstudianteComponent
      },
      {
        path: 'estudiante-list',
        component: EstudianteListComponent
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

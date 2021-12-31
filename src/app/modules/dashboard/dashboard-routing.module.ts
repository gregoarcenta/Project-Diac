import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EstudianteListComponent } from '../estudiante-list/page/estudiante-list/estudiante-list.component';
import { DefaultDashboardComponent } from './default-dashboard/default-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultDashboardComponent,
    children: [

      {
        path: 'asignatura',
        loadChildren: () => import('../destreza/destreza.module').then(m => m.DestrezaModule)
      },

      {
        path: 'estudiante-list',
        component: EstudianteListComponent
      },

      {
        path: 'adaptacion-curricular',
        loadChildren: () => import('../estudiante/estudiante.module').then(m => m.EstudianteModule)
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

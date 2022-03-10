import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        path: 'adaptacion-curricular/lista',
        loadChildren: () => import('../documento-curricular-list/documento-curricular-list.module').then(m => m.DocumentoCurricularListModule)
      },

      {
        path: 'docente',
        loadChildren: () => import('../docente/docente.module').then(m => m.DocenteModule)
      },
      {
        path: 'estudiante',
        loadChildren: () => import('../estudiante/estudiante.module').then(m => m.EstudianteModule)
      },

      {
        path: 'institucion',
        loadChildren: () => import('../institucion/institucion.module').then(m => m.InstitucionModule)
      },

      {
        path: 'adaptacion-curricular',
        loadChildren: () => import('../documento-curricular/documento-curricular.module').then(m => m.DocumentoCurricularModule)
      },
      {
        path: '**',
        redirectTo: '/dashboard/estudiante'
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdapCurriculoComponent } from './page/adap-curriculo/adap-curriculo.component';
import { AdaptacionComponent } from './page/adaptacion/adaptacion.component';
import { DocentesImpComponent } from './page/docentes-imp/docentes-imp.component';
import { EstudianteLayoutComponent } from './page/estudiante-layout/estudiante-layout.component';

import { EstudianteComponent } from './page/estudiante/estudiante.component';
import { FechaElaboracionComponent } from './page/fecha-elaboracion/fecha-elaboracion.component';
import { HistorialPersonalComponent } from './page/historial-personal/historial-personal.component';
import { InfContextoComponent } from './page/inf-contexto/inf-contexto.component';
import { InstitucionComponent } from './page/institucion/institucion.component';
import { MetodologiaComponent } from './page/metodologia/metodologia.component';

const routes: Routes = [
  {
    path: '',
    component: EstudianteLayoutComponent,
    children: [
      {
        path: 'estudiante',
        component: EstudianteComponent
      },
      {
        path: 'institucion',
        component: InstitucionComponent
      },
      {
        path: 'fecha-elaboracion',
        component: FechaElaboracionComponent
      },

      {
        path: 'docentes-imp',
        component: DocentesImpComponent
      },

      {
        path: 'historial-personal',
        component: HistorialPersonalComponent
      },

      {
        path: 'inf-contexto',
        component: InfContextoComponent
      },

      {
        path: 'adap-curriculo',
        component: AdapCurriculoComponent
      },

      {
        path: 'adaptacion',
        component: AdaptacionComponent
      },

      {
        path: 'metodologia',
        component: MetodologiaComponent
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentoCurricularRoutingModule { }

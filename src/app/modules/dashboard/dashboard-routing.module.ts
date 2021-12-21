import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestrezaComponent } from '../destreza/page/destreza/destreza.component';
import { EstudianteComponent } from '../estudiante/page/estudiante/estudiante.component';
import { EstudianteListComponent } from '../estudiante-list/page/estudiante-list/estudiante-list.component';
import { DefaultDashboardComponent } from './default-dashboard/default-dashboard.component';
import { InstitucionComponent } from '../institucion/page/institucion/institucion.component';
import { FechaElaboracionComponent } from '../fecha-elaboracion/page/fecha-elaboracion/fecha-elaboracion.component';
import { DocentesImpComponent } from '../docentes-imp/page/docentes-imp/docentes-imp.component';
import { HistorialPersonalComponent } from '../historial-personal/page/historial-personal/historial-personal.component';
import { InfContextoComponent } from '../inf-contexto/page/inf-contexto/inf-contexto.component';
import { AdapCurriculoComponent } from '../adap-curriculo/page/adap-curriculo/adap-curriculo.component';
import { MetodologiaComponent } from '../metodologia/page/metodologia/metodologia.component';




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
        path: 'estudiante-list',
        component: EstudianteListComponent
      },

      {
        path: 'estudiante',
        component: EstudianteComponent
      },
      
      {
        path: 'estudiante/institucion',
        component: InstitucionComponent
      },
      
      {
        path: 'estudiante/institucion/fecha-elaboracion',
        component: FechaElaboracionComponent
      },
      
      {
        path: 'estudiante/institucion/fecha-elaboracion/docentes-imp',
        component: DocentesImpComponent
      },
      
      {
        path: 'estudiante/institucion/fecha-elaboracion/docentes-imp/historial-personal',
        component: HistorialPersonalComponent
      },
      
      {
        path: 'estudiante/institucion/fecha-elaboracion/docentes-imp/historial-personal/inf-contexto',
        component: InfContextoComponent
      },

      {
        path: 'estudiante/institucion/fecha-elaboracion/docentes-imp/historial-personal/inf-contexto/adap-curriculo',
        component: AdapCurriculoComponent
      },



      

      {
        path: 'estudiante/institucion/fecha-elaboracion/docentes-imp/historial-personal/inf-contexto/adap-curriculo/metodologia',
        component: MetodologiaComponent
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

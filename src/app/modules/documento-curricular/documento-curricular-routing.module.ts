import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdaptacionComponent } from './page/adaptacion/adaptacion.component';
import { CriteriosEvaluacionComponent } from './page/criterios-evaluacion/criterios-evaluacion.component';
import { DocentesImpComponent } from './page/docentes-imp/docentes-imp.component';
import { EstudianteLayoutComponent } from './page/estudiante-layout/estudiante-layout.component';

import { EstudianteComponent } from './page/estudiante/estudiante.component';
import { FechaElaboracionComponent } from './page/fecha-elaboracion/fecha-elaboracion.component';
import { HistorialPersonalComponent } from './page/historial-personal/historial-personal.component';
import { InfoContextoEducativoComponent } from './page/info-contexto-educativo/info-contexto-educativo.component';
import { InfoContextoFamiliarComponent } from './page/info-contexto-familiar/info-contexto-familiar.component';
import { InfoContextoSocialComponent } from './page/info-contexto-social/info-contexto-social.component';
import { InfoPedagogicoComponent } from './page/info-pedagogico/info-pedagogico.component';
import { InstitucionComponent } from './page/institucion/institucion.component';
import { MateriasAdapCurricularComponent } from './page/materias-adap-curricular/materias-adap-curricular.component';
import { MetodologiaComponent } from './page/metodologia/metodologia.component';
import { NecesidadesEducativasComponent } from './page/necesidades-educativas/necesidades-educativas.component';
import { ProfesionalesEspecializadosComponent } from './page/profesionales-especializados/profesionales-especializados.component';
import { RecursosTecnicosComponent } from './page/recursos-tecnicos/recursos-tecnicos.component';
import { RecursosComponent } from './page/recursos/recursos.component';
import { ResultadosFinalesComponent } from './page/resultados-finales/resultados-finales.component';

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
        path: 'materias-adaptacion-curricular',
        component: MateriasAdapCurricularComponent
      },
      {
        path: 'docentes-imp',
        component: DocentesImpComponent
      },
      {
        path: 'informe-psicopedagogico',
        component: InfoPedagogicoComponent
      },
      {
        path: 'historial-personal',
        component: HistorialPersonalComponent
      },
      {
        path: 'informacion-contexto-educativo',
        component: InfoContextoEducativoComponent
      },
      {
        path: 'informacion-contexto-familiar',
        component: InfoContextoFamiliarComponent
      },
      {
        path: 'informacion-contexto-social',
        component: InfoContextoSocialComponent
      },
      {
        path: 'necesidades-educativas',
        component: NecesidadesEducativasComponent
      },
      {
        path: 'recursos-tecnicos',
        component: RecursosTecnicosComponent
      },
      {
        path: 'profesionales-especializados',
        component: ProfesionalesEspecializadosComponent
      },

      {
        path: 'adaptacion-curricular',
        component: AdaptacionComponent
      },

      {
        path: 'metodologia',
        component: MetodologiaComponent
      },
      {
        path: 'recursos',
        component: RecursosComponent
      },
      {
        path: 'criterios-evaluacion',
        component: CriteriosEvaluacionComponent
      },
      {
        path: 'resultados-finales',
        component: ResultadosFinalesComponent
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentoCurricularRoutingModule { }

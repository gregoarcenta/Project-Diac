import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentoCurricularRoutingModule } from './documento-curricular-routing.module';

import { EstudianteLayoutComponent } from './page/estudiante-layout/estudiante-layout.component';
import { EstudianteComponent } from './page/estudiante/estudiante.component';
import { InstitucionComponent } from './page/institucion/institucion.component';
import { FechaElaboracionComponent } from './page/fecha-elaboracion/fecha-elaboracion.component';
import { MateriasAdapCurricularComponent } from './page/materias-adap-curricular/materias-adap-curricular.component';
import { InfoPedagogicoComponent } from './page/info-pedagogico/info-pedagogico.component';
import { DocentesImpComponent } from './page/docentes-imp/docentes-imp.component';
import { HistorialPersonalComponent } from './page/historial-personal/historial-personal.component';
import { InfoContextoEducativoComponent } from './page/info-contexto-educativo/info-contexto-educativo.component';
import { InfoContextoFamiliarComponent } from './page/info-contexto-familiar/info-contexto-familiar.component';
import { InfoContextoSocialComponent } from './page/info-contexto-social/info-contexto-social.component';



@NgModule({
  declarations: [
    EstudianteLayoutComponent,
    EstudianteComponent,
    InstitucionComponent,
    FechaElaboracionComponent,
    MateriasAdapCurricularComponent,
    DocentesImpComponent,
    InfoPedagogicoComponent,
    HistorialPersonalComponent,
    InfoContextoEducativoComponent,
    InfoContextoFamiliarComponent,
    InfoContextoSocialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentoCurricularRoutingModule
  ]
})
export class DocumentoCurricularModule { }

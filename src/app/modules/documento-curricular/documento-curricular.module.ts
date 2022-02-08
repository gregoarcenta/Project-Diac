import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteComponent } from './page/estudiante/estudiante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentoCurricularRoutingModule } from './documento-curricular-routing.module';
import { EstudianteLayoutComponent } from './page/estudiante-layout/estudiante-layout.component';



@NgModule({
  declarations: [
    EstudianteComponent,
    EstudianteLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentoCurricularRoutingModule
  ]
})
export class DocumentoCurricularModule { }

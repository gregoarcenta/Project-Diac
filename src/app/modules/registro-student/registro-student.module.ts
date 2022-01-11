import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarEstudianteComponent } from './pages/agregar-estudiante/agregar-estudiante.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { RegistroStudentRoutingModule } from './registro-student-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AgregarEstudianteComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule,
    RegistroStudentRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RegistroStudentModule { }

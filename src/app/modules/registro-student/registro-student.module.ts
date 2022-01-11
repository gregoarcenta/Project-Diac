import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarEstudianteComponent } from './pages/agregar-estudiante/agregar-estudiante.component';
import { StudentListComponent } from './pages/student-list/student-list.component';



@NgModule({
  declarations: [
    AgregarEstudianteComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RegistroStudentModule { }

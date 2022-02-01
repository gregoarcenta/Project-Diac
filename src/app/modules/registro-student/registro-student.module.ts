import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarEstudianteComponent } from './pages/agregar-estudiante/agregar-estudiante.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { RegistroStudentRoutingModule } from './registro-student-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AgregarEstudianteComponent,
    StudentListComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    RegistroStudentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class RegistroStudentModule { }

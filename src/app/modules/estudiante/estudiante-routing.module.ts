import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEstudianteComponent } from './pages/agregar-estudiante/agregar-estudiante.component';
import { StudentListComponent } from './pages/student-list/student-list.component'

const routes: Routes = [
  {
    path: '',
    component: StudentListComponent,
  },
  {
    path: 'agregar',
    component: AgregarEstudianteComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteRoutingModule { }

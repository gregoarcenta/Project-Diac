import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarDestrezaComponent } from './page/agregar-destreza/agregar-destreza.component';
import { DestrezaComponent } from './page/destreza/destreza.component';
import { VerAsignaturasComponent } from './page/ver-asignaturas/ver-asignaturas.component';

const routes: Routes = [
  {
    path: '',
    component: VerAsignaturasComponent,
  },
  {
    path: 'agregar',
    component: DestrezaComponent
  },
  {
    path: ':name/:idCourse',
    component: AgregarDestrezaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DestrezaRoutingModule { }

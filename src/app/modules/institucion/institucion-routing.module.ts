import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarInstitucionComponent } from './page/agregar-institucion/agregar-institucion.component';
import { InstitucionListComponent } from './page/institucion-list/institucion-list.component';

const routes: Routes = [
  {
    path: '',
    component: InstitucionListComponent
  },
  {
    path: 'agregar',
    component: AgregarInstitucionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitucionRoutingModule { }

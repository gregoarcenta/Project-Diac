import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarDocenteComponent } from './pages/agregar-docente/agregar-docente.component';
import { DocenteListComponent } from './pages/docente-list/docente-list.component';

const routes: Routes = [
  {
    path: '',
    component: DocenteListComponent,
  },
  {
    path: 'agregar',
    component: AgregarDocenteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocenteRoutingModule { }

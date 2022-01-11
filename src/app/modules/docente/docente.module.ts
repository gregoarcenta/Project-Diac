import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocenteListComponent } from './pages/docente-list/docente-list.component';
import { AgregarDocenteComponent } from './pages/agregar-docente/agregar-docente.component';
import { DocenteRoutingModule } from './estudiante-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DocenteListComponent,
    AgregarDocenteComponent
  ],
  imports: [
    CommonModule,
    DocenteRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DocenteModule { }

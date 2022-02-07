import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocenteListComponent } from './pages/docente-list/docente-list.component';
import { AgregarDocenteComponent } from './pages/agregar-docente/agregar-docente.component';
import { DocenteRoutingModule } from './docente-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    DocenteListComponent,
    AgregarDocenteComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    DocenteRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class DocenteModule { }

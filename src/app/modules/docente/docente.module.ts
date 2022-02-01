import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocenteListComponent } from './pages/docente-list/docente-list.component';
import { AgregarDocenteComponent } from './pages/agregar-docente/agregar-docente.component';
import { DocenteRoutingModule } from './estudiante-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalSaveComponent } from './components/modal-save/modal-save.component';

import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    DocenteListComponent,
    AgregarDocenteComponent,
    ModalSaveComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    DocenteRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class DocenteModule { }

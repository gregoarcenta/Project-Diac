import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitucionRoutingModule } from './institucion-routing.module';
import { AgregarInstitucionComponent } from './page/agregar-institucion/agregar-institucion.component';
import { InstitucionListComponent } from './page/institucion-list/institucion-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AgregarInstitucionComponent,
    InstitucionListComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    InstitucionRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class InstitucionModule { }

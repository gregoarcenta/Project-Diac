import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitucionRoutingModule } from './institucion-routing.module';
import { AgregarInstitucionComponent } from './page/agregar-institucion/agregar-institucion.component';
import { InstitucionListComponent } from './page/institucion-list/institucion-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AgregarInstitucionComponent,
    InstitucionListComponent
  ],
  imports: [
    CommonModule,
    InstitucionRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class InstitucionModule { }

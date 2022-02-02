import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DestrezaComponent } from './page/destreza/destreza.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { VerAsignaturasComponent } from './page/ver-asignaturas/ver-asignaturas.component';
import { DestrezaRoutingModule } from './destreza-routing.module';
import { AgregarDestrezaComponent } from './page/agregar-destreza/agregar-destreza.component';

@NgModule({
  declarations: [
    VerAsignaturasComponent,
    DestrezaComponent,
    AgregarDestrezaComponent
  ],
  exports: [
    DestrezaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DestrezaRoutingModule
  ]
})
export class DestrezaModule { }

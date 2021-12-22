import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DestrezaComponent } from './page/destreza/destreza.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { VerAsignaturasComponent } from './page/ver-asignaturas/ver-asignaturas.component';
import { DestrezaRoutingModule } from './destreza-routing.module';

@NgModule({
  declarations: [
    DestrezaComponent,
    VerAsignaturasComponent
  ],
  exports: [
    DestrezaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DestrezaRoutingModule
  ]
})
export class DestrezaModule { }

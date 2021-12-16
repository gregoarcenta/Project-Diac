import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DestrezaComponent } from './page/destreza/destreza.component';

@NgModule({
  declarations: [
    DestrezaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DestrezaModule { }

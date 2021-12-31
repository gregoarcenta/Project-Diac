import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteComponent } from './page/estudiante/estudiante.component';
import { FormsModule } from '@angular/forms';
import { EstudianteRoutingModule } from './estudiante-routing.module';
import { EstudianteLayoutComponent } from './page/estudiante-layout/estudiante-layout.component';



@NgModule({
  declarations: [
    EstudianteComponent,
    EstudianteLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EstudianteRoutingModule
  ]
})
export class EstudianteModule { }

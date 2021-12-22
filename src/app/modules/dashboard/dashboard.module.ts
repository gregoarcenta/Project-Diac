import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DefaultDashboardComponent } from './default-dashboard/default-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';

import { EstudianteModule } from '../estudiante/estudiante.module';

@NgModule({
  declarations: [
    DefaultDashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    SharedModule,
    EstudianteModule
  ]
})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AsignaturaComponent } from './modules/asignatura/asignatura.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { StudenComponent } from './modules/studen/studen.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  },
   {
     path: 'asignatura',
     component: AsignaturaComponent
  },
  {
    path: 'studen',
    component: StudenComponent
 }
]
  

}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

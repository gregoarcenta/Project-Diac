import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentoCurricularListComponent } from './page/documento-curricular-list/documento-curricular-list.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentoCurricularListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentoCurricularListRoutingModule { }

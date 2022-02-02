import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentoCurricularListComponent } from './page/documento-curricular-list/documento-curricular-list.component';
import { DocumentoCurricularListRoutingModule } from './documento-curricular-list-routing.module';


@NgModule({
  declarations: [
    DocumentoCurricularListComponent
  ],
  imports: [
    CommonModule,
    DocumentoCurricularListRoutingModule
  ]
})
export class DocumentoCurricularListModule { }

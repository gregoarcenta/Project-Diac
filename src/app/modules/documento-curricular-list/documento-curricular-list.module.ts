import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentoCurricularListComponent } from './page/documento-curricular-list/documento-curricular-list.component';
import { DocumentoCurricularListRoutingModule } from './documento-curricular-list-routing.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DocumentoCurricularListComponent,
    FilterPipe,
    

  ],
  imports: [
    CommonModule,
    DocumentoCurricularListRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DocumentoCurricularListModule { }

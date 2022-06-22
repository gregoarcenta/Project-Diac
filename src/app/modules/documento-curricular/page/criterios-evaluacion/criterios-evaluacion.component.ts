import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

@Component({
  selector: 'app-criterios-evaluacion',
  templateUrl: './criterios-evaluacion.component.html',
  styleUrls: ['./criterios-evaluacion.component.css']
})
export class CriteriosEvaluacionComponent implements OnInit {

   primerQuimestre: String = '' 
   reajustes: String=''
   segundoQuimestre: String=''

  constructor(
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService
  ) {}

  ngOnInit(): void {
    this.primerQuimestre = this.registerDocumentCurricular.docCurricularForm.value.criterios
    
  }

  fillResources() {
    this.registerDocumentCurricular.docCurricularForm.controls['criterios'].setValue(this.primerQuimestre)
  }

  nextPage() {
    this.navigationService.toggleItemActivated(18);
  }
}

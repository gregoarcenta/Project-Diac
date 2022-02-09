import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

@Component({
  selector: 'app-necesidades-educativas',
  templateUrl: './necesidades-educativas.component.html',
  styleUrls: ['./necesidades-educativas.component.css']
})
export class NecesidadesEducativasComponent implements OnInit {

  necesidadEdicativa: string = ''

  constructor(
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.necesidadEdicativa = this.registerDocumentCurricular.docCurricularForm.value.educationalNeed
  }

  fillInfoNecesidadEduca() {
    this.registerDocumentCurricular.docCurricularForm.controls['educationalNeed'].setValue(this.necesidadEdicativa)
  }

  nextPage() {
    this.navigationService.toggleItemActivated(12)
  }

}

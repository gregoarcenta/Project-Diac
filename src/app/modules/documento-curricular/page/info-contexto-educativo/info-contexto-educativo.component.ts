import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

@Component({
  selector: 'app-info-contexto-educativo',
  templateUrl: './info-contexto-educativo.component.html',
  styleUrls: ['./info-contexto-educativo.component.css']
})
export class InfoContextoEducativoComponent implements OnInit {

  valueContextoEducativo: string = ''

  constructor(
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.valueContextoEducativo = this.registerDocumentCurricular.docCurricularForm.value.contextEducation
  }

  fillInfoContextoEducativo() {
    this.registerDocumentCurricular.docCurricularForm.controls['contextEducation'].setValue(this.valueContextoEducativo.trim())
  }

  nextPage() {
    this.navigationService.toggleItemActivated(9)
  }

}

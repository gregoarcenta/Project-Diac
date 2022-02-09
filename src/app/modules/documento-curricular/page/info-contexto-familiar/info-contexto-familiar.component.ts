import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

@Component({
  selector: 'app-info-contexto-familiar',
  templateUrl: './info-contexto-familiar.component.html',
  styleUrls: ['./info-contexto-familiar.component.css']
})
export class InfoContextoFamiliarComponent implements OnInit {

  valueContextoFamiliar: string = ''

  constructor(
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.valueContextoFamiliar = this.registerDocumentCurricular.docCurricularForm.value.contextFamily
  }

  fillInfoContextoFamiliar() {
    this.registerDocumentCurricular.docCurricularForm.controls['contextFamily'].setValue(this.valueContextoFamiliar)
  }

  nextPage() {
    this.navigationService.toggleItemActivated(10)
  }

}

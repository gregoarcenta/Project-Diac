import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

@Component({
  selector: 'app-info-pedagogico',
  templateUrl: './info-pedagogico.component.html',
  styleUrls: ['./info-pedagogico.component.css']
})
export class InfoPedagogicoComponent implements OnInit {

  valueInfoPsico: string = ''

  constructor(
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.valueInfoPsico = this.registerDocumentCurricular.docCurricularForm.value.infPhicopedagogico
  }

  fillInfoPedagogico() {
    this.registerDocumentCurricular.docCurricularForm.controls['infPhicopedagogico'].setValue(this.valueInfoPsico)
  }

  nextPage() {
    this.navigationService.toggleItemActivated(7)
  }

}

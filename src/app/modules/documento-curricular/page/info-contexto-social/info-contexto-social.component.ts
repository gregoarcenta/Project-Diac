import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

@Component({
  selector: 'app-info-contexto-social',
  templateUrl: './info-contexto-social.component.html',
  styleUrls: ['./info-contexto-social.component.css']
})
export class InfoContextoSocialComponent implements OnInit {

  valueContextoSocial: string = ''

  constructor(
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.valueContextoSocial = this.registerDocumentCurricular.docCurricularForm.value.contextSocial
  }

  fillInfoContextoSocial() {
    this.registerDocumentCurricular.docCurricularForm.controls['contextSocial'].setValue(this.valueContextoSocial)
  }

  nextPage() {
    this.navigationService.toggleItemActivated(11)
  }

}

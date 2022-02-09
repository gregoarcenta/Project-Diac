import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

@Component({
  selector: 'app-historial-personal',
  templateUrl: './historial-personal.component.html',
  styleUrls: ['./historial-personal.component.css']
})
export class HistorialPersonalComponent implements OnInit {

  datoDesarrollo: string = ''
  antecedentes: string = ''
  historia: string = ''
  estilos: string = ''
  inteligencia: string = ''

  constructor(
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.datoDesarrollo = this.registerDocumentCurricular.docCurricularForm.value.dateDevelopment
    this.antecedentes = this.registerDocumentCurricular.docCurricularForm.value.antecedentes
    this.historia = this.registerDocumentCurricular.docCurricularForm.value.history
    this.estilos = this.registerDocumentCurricular.docCurricularForm.value.stylelearning
    this.inteligencia = this.registerDocumentCurricular.docCurricularForm.value.tipeIntelligence
  }

  fillInfoHistoriaPersonal() {
    this.registerDocumentCurricular.docCurricularForm.controls['dateDevelopment'].setValue(this.datoDesarrollo)
    this.registerDocumentCurricular.docCurricularForm.controls['antecedentes'].setValue(this.antecedentes)
    this.registerDocumentCurricular.docCurricularForm.controls['history'].setValue(this.historia)
    this.registerDocumentCurricular.docCurricularForm.controls['stylelearning'].setValue(this.estilos)
    this.registerDocumentCurricular.docCurricularForm.controls['tipeIntelligence'].setValue(this.inteligencia)
  }

  nextPage() {
    this.navigationService.toggleItemActivated(8)
  }

}

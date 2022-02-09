import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

@Component({
  selector: 'app-fecha-elaboracion',
  templateUrl: './fecha-elaboracion.component.html',
  styleUrls: ['./fecha-elaboracion.component.css']
})
export class FechaElaboracionComponent implements OnInit {

  duracion: string = ''

  constructor(
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.duracion = this.registerDocumentCurricular.docCurricularForm.value.duration
  }

  fillDurationDate() {
    this.registerDocumentCurricular.docCurricularForm.controls['duration'].setValue(this.duracion)
  }

  nextPage() {
    this.navigationService.toggleItemActivated(4)
  }

}

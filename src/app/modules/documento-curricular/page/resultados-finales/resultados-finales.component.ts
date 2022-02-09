import { Component, OnInit } from '@angular/core';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultados-finales',
  templateUrl: './resultados-finales.component.html',
  styleUrls: ['./resultados-finales.component.css']
})
export class ResultadosFinalesComponent implements OnInit {

  resultadosFinales: string = ''

  constructor(
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.resultadosFinales = this.registerDocumentCurricular.docCurricularForm.value.resultFinal
  }

  fillResources() {
    this.registerDocumentCurricular.docCurricularForm.controls['resultFinal'].setValue(this.resultadosFinales)
  }

  saveDocumentCurricular() {
    if (this.registerDocumentCurricular.validateResultFinal()) {
      console.log('Guardando documento... GUARDADO!!');
    } else {
      Swal.fire('El campo no puede quedar vacio!', '', 'error')
    }
  }

}

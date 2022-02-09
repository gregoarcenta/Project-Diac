import { Component, OnInit } from '@angular/core';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

import Swal from 'sweetalert2';
import { DocumentBodyCreate } from '../../interfaces/Items-estudiante.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados-finales',
  templateUrl: './resultados-finales.component.html',
  styleUrls: ['./resultados-finales.component.css']
})
export class ResultadosFinalesComponent implements OnInit {

  resultadosFinales: string = ''

  constructor(
    private router: Router,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.resultadosFinales = this.registerDocumentCurricular.docCurricularForm.value.resultFinal
  }

  fillResources() {
    this.registerDocumentCurricular.docCurricularForm.controls['resultFinal'].setValue(this.resultadosFinales)
  }

  saveDocumentCurricular() {
    const spinner = document.getElementById('spinner')
    spinner?.classList.remove('d-none')
    if (this.registerDocumentCurricular.validateResultFinal()) {
      const doc: DocumentBodyCreate = {
        studentId: this.registerDocumentCurricular.docCurricularForm.value.idStudent,
        institutionId: this.registerDocumentCurricular.docCurricularForm.value.idInstitution,
        duration: this.registerDocumentCurricular.docCurricularForm.value.duration,
        infoPedagogica: this.registerDocumentCurricular.docCurricularForm.value.infPhicopedagogico,
        developData: this.registerDocumentCurricular.docCurricularForm.value.dateDevelopment,
        familyBack: this.registerDocumentCurricular.docCurricularForm.value.antecedentes,
        historySchool: this.registerDocumentCurricular.docCurricularForm.value.history,
        styleLearning: this.registerDocumentCurricular.docCurricularForm.value.stylelearning,
        typeIntelligence: this.registerDocumentCurricular.docCurricularForm.value.tipeIntelligence,
        dataContextEducation: this.registerDocumentCurricular.docCurricularForm.value.contextEducation,
        dataContextFamily: this.registerDocumentCurricular.docCurricularForm.value.contextFamily,
        dataContextSocial: this.registerDocumentCurricular.docCurricularForm.value.contextSocial,
        identificationEducationalNeed: this.registerDocumentCurricular.docCurricularForm.value.educationalNeed,
        adaptationAccessCurriculum: this.registerDocumentCurricular.recursosSeleccionados.toString(),
        specializedIntExt: this.registerDocumentCurricular.profesionalesSeleccionados.toString(),
        methodology: this.registerDocumentCurricular.docCurricularForm.value.metodology,
        resourse: this.registerDocumentCurricular.docCurricularForm.value.resources,
        resultFinal: this.registerDocumentCurricular.docCurricularForm.value.resultFinal,
        courses: this.registerDocumentCurricular.asignaturasSeleccionadas,
        teachers: this.registerDocumentCurricular.docentesSeleccionados,
      }

      //console.log('doc ->', doc);

      this.registerDocumentCurricular.addDocumento(doc)
        .subscribe({
          next: (resp) => console.log(resp),
          error: (err) => {
            Swal.fire('Error al realizar el registro del documento', '', 'error')
          },
          complete: () => {
            spinner?.classList.add('d-none')
            Swal.fire('Documento curricular Guardado con exito', '', 'success')
            setTimeout(() => {
              this.router.navigateByUrl('/dashboard/adaptacion-curricular/lista')
            }, 2000)
          }
        })

    } else {
      Swal.fire('El campo no puede quedar vacio!', '', 'error')
    }
  }

}

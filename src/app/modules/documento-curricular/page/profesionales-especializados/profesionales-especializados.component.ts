import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

@Component({
  selector: 'app-profesionales-especializados',
  templateUrl: './profesionales-especializados.component.html',
  styleUrls: ['./profesionales-especializados.component.css']
})
export class ProfesionalesEspecializadosComponent implements OnInit {

  profesionales: string[] = [
    'Fisioterapeuta',
    'Enfermero/a',
    'Terapeuta de lenguaje',
    'Interprete de lengua de signos',
    'Profesor de apoyo en el aula',
    'Otro'
  ]
  profesionalesSeleccionados: string[] = []

  constructor(
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.profesionalesSeleccionados = this.registerDocumentCurricular.profesionalesSeleccionados
  }

  fillArrayResources(e: any, profesional: string) {
    if (e.target.checked) {
      this.profesionalesSeleccionados.push(profesional)
    } else {
      this.profesionalesSeleccionados = this.profesionalesSeleccionados.filter(pro => pro !== profesional)
    }
    const profesionalesArr = new Set(this.profesionalesSeleccionados);
    let result = [...profesionalesArr];
    this.registerDocumentCurricular.profesionalesSeleccionados = result
  }

  marcarCheckbox(profesional: string) {
    return this.registerDocumentCurricular.profesionalesSeleccionados.some(pro => {
      return pro.toString() === profesional.toString()
    });
  }

  nextPage() {
    this.navigationService.toggleItemActivated(14)
  }

}

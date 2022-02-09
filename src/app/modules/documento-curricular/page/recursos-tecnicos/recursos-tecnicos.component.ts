import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

@Component({
  selector: 'app-recursos-tecnicos',
  templateUrl: './recursos-tecnicos.component.html',
  styleUrls: ['./recursos-tecnicos.component.css']
})
export class RecursosTecnicosComponent implements OnInit {
  resourses: string[] = [
    'Sillas de ruedas',
    'Andador, bastones, bipedestadores o similares',
    'Audífonos',
    'Máquina de Perkins',
    'Programa JAWS',
    'Medios de comunicación alternativa y aumentativa',
    'Material didáctico',
    'Otro'
  ]
  recursosSeleccionados: string[] = []

  constructor(
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.recursosSeleccionados = this.registerDocumentCurricular.recursosSeleccionados
  }

  fillArrayResources(e: any, recurso: string) {
    if (e.target.checked) {
      this.recursosSeleccionados.push(recurso)
    } else {
      this.recursosSeleccionados = this.recursosSeleccionados.filter(recurs => recurs !== recurso)
    }
    const recursosArr = new Set(this.recursosSeleccionados);
    let result = [...recursosArr];
    this.registerDocumentCurricular.recursosSeleccionados = result
  }

  marcarCheckbox(resource: string) {
    return this.registerDocumentCurricular.recursosSeleccionados.some(recurso => {
      return recurso.toString() === resource.toString()
    });
  }

  nextPage() {
    this.navigationService.toggleItemActivated(13)
  }

}

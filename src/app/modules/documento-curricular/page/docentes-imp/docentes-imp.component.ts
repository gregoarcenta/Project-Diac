import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/modules/docente/interfaces/docente.interface';

import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';
import { DocenteService } from '../../../docente/services/docente.service';


@Component({
  selector: 'app-docentes-imp',
  templateUrl: './docentes-imp.component.html',
  styleUrls: ['./docentes-imp.component.css']
})
export class DocentesImpComponent implements OnInit {

  docentesList: Teacher[] = []
  coursesList: CoursesList = {
    courses: []
  }

  docenteListSelected: Teacher[] = []
  docentesSeleccionados: number[] = []

  constructor(
    private docenteService: DocenteService,
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.coursesList['courses'] = this.registerDocumentCurricular.asignaturasSeleccionadas
    this.docenteService.getDocentesByCourse(this.coursesList)
      .subscribe(docentes => this.docentesList = docentes.teachers)
    this.docenteListSelected = this.registerDocumentCurricular.docenteListSelected
    this.docentesSeleccionados = this.registerDocumentCurricular.docentesSeleccionados
  }

  fillArrayDocentes(e: any, docente: Teacher) {
    if (e.target.checked) {
      this.docenteListSelected.push(docente)
      this.docentesSeleccionados.push(docente.id)
    } else {
      this.docenteListSelected = this.docenteListSelected.filter(docent => docent.id !== docente.id)
      this.docentesSeleccionados = this.docentesSeleccionados.filter(id => id !== docente.id)
    }
    const docentesArr = new Set(this.docenteListSelected);
    const idsDocentesArr = new Set(this.docentesSeleccionados);
    let resultDocentes = [...docentesArr];
    let resultIdsDocentes = [...idsDocentesArr];
    this.registerDocumentCurricular.docenteListSelected = resultDocentes
    this.registerDocumentCurricular.docentesSeleccionados = resultIdsDocentes
  }

  marcarCheckbox(idd: number) {
    return this.registerDocumentCurricular.docentesSeleccionados.some(id => {
      return id.toString() === idd.toString()
    });
  }

  nextPage() {
    this.navigationService.toggleItemActivated(6)
  }

}

export interface CoursesList {
  courses: number[];
}


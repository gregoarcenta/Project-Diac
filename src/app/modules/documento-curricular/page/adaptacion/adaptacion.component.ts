import { Component, OnInit } from '@angular/core';
import { Course, Objective, Destreza } from 'src/app/modules/destreza/interfaces/asignatura.interface';

import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';


@Component({
  selector: 'app-adaptacion',
  templateUrl: './adaptacion.component.html',
  styleUrls: ['./adaptacion.component.css']
})
export class AdaptacionComponent implements OnInit {

  grado: string = ''
  ente: string = ''
  tiempo: string = ''

  //Variables para los texts areas
  toDo: string = ''
  howToDo: string = ''

  //Variables para los texts areas
  ObjetivosActuales: Objective[] = []
  destrezasActuales: Destreza[] = []

  constructor(
    private navigationService: NavigationService,
    public registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.grado = this.registerDocumentCurricular.docCurricularForm.value.grade
    this.ente = this.registerDocumentCurricular.docCurricularForm.value.ente
    this.tiempo = this.registerDocumentCurricular.docCurricularForm.value.duration
    this.toDo = this.registerDocumentCurricular.docCurricularForm.value.toDo
    this.howToDo = this.registerDocumentCurricular.docCurricularForm.value.howToDo
  }

  openObjectives(asignatura: Course) {
    this.ObjetivosActuales = asignatura.Objectives
  }

  openDestrezas(asignatura: Course) {
    this.destrezasActuales = asignatura.Destrezas
  }

  fillArrayObjetivos(e: any, objetivo: Objective) {
    /*  if (e.target.checked) {
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
     this.registerDocumentCurricular.docentesSeleccionados = resultIdsDocentes */
  }

  fillArrayDestrezas(e: any, destreza: Destreza) {

  }

  marcarCheckboxObjetivos(id: number) {
    /* return this.registerDocumentCurricular.docentesSeleccionados.some(id => {
      return id.toString() === idd.toString()
    }); */
  }

  marcarCheckboxDestrezas(id: number) {

  }

  renameForId(name: string) {
    return '#' + name.replace(/ /g, '')
  }

  renameForIdCollapse(name: string) {
    return name.replace(/ /g, '')
  }

  nextPage() {
    this.navigationService.toggleItemActivated(15)
  }

}

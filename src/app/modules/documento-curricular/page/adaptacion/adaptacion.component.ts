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

  //Objetivos seleccionados
  ObjetivosListSelected: Objective[] = []
  ObjetivosSeleccionados: number[] = []

  //Destrezas seleccionadas
  DestrezasListSelected: Destreza[] = []
  DestrezasSeleccionadas: number[] = []

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
    if (e.target.checked) {
      this.ObjetivosListSelected.push(objetivo)
      this.ObjetivosSeleccionados.push(objetivo.id)
      console.log(this.ObjetivosSeleccionados);
    } else {
      this.ObjetivosListSelected = this.ObjetivosListSelected.filter(obj => obj.id !== objetivo.id)
      this.ObjetivosSeleccionados = this.ObjetivosSeleccionados.filter(id => id !== objetivo.id)
    }
    let resultado = new Set(this.ObjetivosListSelected);
    this.ObjetivosListSelected = [];
    resultado.forEach(element => {
      this.ObjetivosListSelected.push(element)
    });
  }

  fillArrayDestrezas(e: any, destreza: Destreza) {
    if (e.target.checked) {
      this.DestrezasListSelected.push(destreza)
      this.DestrezasSeleccionadas.push(destreza.id)
    } else {
      this.DestrezasListSelected = this.DestrezasListSelected.filter(des => des.id !== destreza.id)
      this.DestrezasSeleccionadas = this.DestrezasSeleccionadas.filter(id => id !== destreza.id)
    }
    let resultado = new Set(this.DestrezasListSelected);
    this.DestrezasListSelected = [];
    resultado.forEach(element => {
      this.DestrezasListSelected.push(element)
    });
  }

  marcarCheckboxObjetivos(id: number) {
    return this.registerDocumentCurricular.objetivosSeleccionados.some(id => {
      return id.toString() === id.toString()
    });
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

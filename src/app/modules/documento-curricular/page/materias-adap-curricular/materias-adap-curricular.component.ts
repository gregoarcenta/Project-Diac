import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/modules/destreza/interfaces/asignatura.interface';
import { DestrezaService } from 'src/app/modules/destreza/service/destreza.service';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-materias-adap-curricular',
  templateUrl: './materias-adap-curricular.component.html',
  styleUrls: ['./materias-adap-curricular.component.css']
})
export class MateriasAdapCurricularComponent implements OnInit {

  asignaturas: Course[] = []
  asignaturasSeleccionadas: number[] = []

  constructor(
    private asignaturasServices: DestrezaService,
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.asignaturasServices.allAsignaturas()
      .subscribe({
        next: ({ courses }) => {
          this.asignaturas = courses
        },
        error: (error) => {
          Swal.fire('Hubo un error al cargar las asignaturas', '', 'error')
        }
      })
    this.asignaturasSeleccionadas = this.registerDocumentCurricular.asignaturasSeleccionadas
  }

  fillArrayCourses(e: any, asignatura: Course) {
    if (e.target.checked) {
      this.asignaturasSeleccionadas.push(asignatura.id)
      this.registerDocumentCurricular.asignaturaListSelected.push(asignatura)
    } else {
      this.asignaturasSeleccionadas = this.asignaturasSeleccionadas.filter(id => id !== asignatura.id)
      this.registerDocumentCurricular.asignaturaListSelected = this.registerDocumentCurricular.asignaturaListSelected.filter(asignatur => asignatur.id !== asignatura.id)
    }

    this.registerDocumentCurricular.asignaturasSeleccionadas = this.asignaturasSeleccionadas
  }

  marcarCheckbox(idd: number) {
    return this.registerDocumentCurricular.asignaturasSeleccionadas.some(id => {
      return id.toString() === idd.toString()
    });
  }

  nextPage() {
    this.navigationService.toggleItemActivated(5)
  }

}

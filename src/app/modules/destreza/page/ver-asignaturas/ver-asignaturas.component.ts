import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AsignaturaList, Course, Destreza, Objective } from '../../interfaces/asignatura.interface';
import { DestrezaService } from '../../service/destreza.service';

@Component({
  selector: 'app-ver-asignaturas',
  templateUrl: './ver-asignaturas.component.html',
  styleUrls: ['./ver-asignaturas.component.css']
})
export class VerAsignaturasComponent implements OnInit {

  activateAnimationArrowObj: boolean = false
  activateAnimationArrowDes: boolean = false

  messageError: string = ''
  typeAlert: string = ''
  alertActive: boolean = false

  asiganturaSelect: string = ''
  asignaturaSeleccionada: Course | undefined
  asignaturas: AsignaturaList = {
    courses: []
  }

  valueUpdate!: Destreza | Objective
  valueInputUpdate: string = ''
  isDestreza: boolean = false

  constructor(private destrezaService: DestrezaService) { }

  ngOnInit(): void {
    this.destrezaService.allAsignaturas()
      .subscribe({
        next: ({ courses }) => {
          this.asignaturas.courses = courses
          console.log(this.asignaturas.courses);
        },
        error: (error) => console.log(error)
      })

  }

  showAlert(value: boolean) {
    this.alertActive = value
  }

  rotateArrowObj() {
    this.activateAnimationArrowObj = !this.activateAnimationArrowObj
  }

  rotateArrowDes() {
    this.activateAnimationArrowDes = !this.activateAnimationArrowDes
  }

  llenarObjetivosDestrezas() {
    const asignatura = this.asignaturas.courses.filter(asignatura => {
      return asignatura.nameCourse === this.asiganturaSelect
    })
    this.asignaturaSeleccionada = asignatura[0]
  }

  validarAsignatura() {
    this.llenarObjetivosDestrezas()
  }

  getDestreza(obj: Destreza) {
    console.log(obj);
    this.isDestreza = true
    this.valueInputUpdate = obj.nameDestreza
    this.valueUpdate = obj
  }

  getObjective(obj: Objective) {
    console.log(obj);
    this.isDestreza = false
    this.valueInputUpdate = obj.nameObjective
    this.valueUpdate = obj
  }

  updateDestrezaObjetivo() {
    if (this.isDestreza) {
      this.destrezaService.updateDestreza(this.valueUpdate.id, { nameDestreza: this.valueInputUpdate })
        .subscribe({
          next: (destrezaResponse) => {
            const newArrDestrezas = this.asignaturaSeleccionada!.Destrezas.map(destreza => {
              if (destreza.id === destrezaResponse.id) {
                destreza.nameDestreza = destrezaResponse.nameDestreza
              }
              return destreza
            })
            this.asignaturaSeleccionada!.Destrezas = newArrDestrezas
            this.messageError = 'Destreza Actualizada'
            this.typeAlert = 'success'
            this.showAlert(true)
          },
          error: (error) => console.log(error)
        })
    } else {
      this.destrezaService.updateObjective(this.valueUpdate.id, { nameObjective: this.valueInputUpdate })
        .subscribe({
          next: (objectiveResponse) => {
            const newArrObjectives = this.asignaturaSeleccionada!.Objectives.map(objective => {
              if (objective.id === objectiveResponse.id) {
                objective.nameObjective = objectiveResponse.nameObjective
              }
              return objective
            })
            this.asignaturaSeleccionada!.Objectives = newArrObjectives
            this.messageError = 'Objetivo Actualizado'
            this.typeAlert = 'success'
            this.showAlert(true)
          },
          error: (error) => console.log(error)

        })
    }
  }

  showMenu() {
    const listMenu = document.querySelector('.list-group-plus')
    listMenu?.classList.toggle('show')
  }
  deleteDestreza() { }

}

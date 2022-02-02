import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  asignaturaSeleccionada: Course | undefined
  asignaturas: AsignaturaList = {
    courses: []
  }

  valueDelete!: number
  valueUpdate!: Destreza | Objective
  valueInputUpdate: string = ''
  isDestreza: boolean = false

  asiganturaSelectForm: FormGroup = this.fb.group({
    asignatura: ['0'],
  })

  constructor(private destrezaService: DestrezaService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.destrezaService.allAsignaturas()
      .subscribe({
        next: ({ courses }) => {
          this.asignaturas.courses = courses
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
    let asignaturaSeleccionada = this.asiganturaSelectForm.value.asignatura
    if (asignaturaSeleccionada !== "0") {
      const asignatura = this.asignaturas.courses.filter(asignatura => {
        return asignatura.nameCourse === this.asiganturaSelectForm.value.asignatura
      })
      this.asignaturaSeleccionada = asignatura[0]
    } else {
      this.asignaturaSeleccionada = undefined
    }

  }

  validarAsignatura() {
    this.llenarObjetivosDestrezas()
  }

  getDestreza(obj: Destreza) {
    this.isDestreza = true
    this.valueInputUpdate = obj.nameDestreza
    this.valueUpdate = obj
  }

  getObjective(obj: Objective) {
    this.isDestreza = false
    this.valueInputUpdate = obj.nameObjective
    this.valueUpdate = obj
  }

  deleteDestreza(id: number) {
    this.isDestreza = true
    this.valueDelete = id
  }

  deleteObjetivo(id: number) {
    this.isDestreza = false
    this.valueDelete = id
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

  deleteDestrezaObjetivo() {
    if (this.isDestreza) {
      this.destrezaService.deleteDestreza(this.valueDelete)
        .subscribe({
          next: (destrezaResponse) => {
            const newArrDestrezas = this.asignaturaSeleccionada!.Destrezas.filter(destreza => {
              return destreza.id !== destrezaResponse.id
            })
            this.asignaturaSeleccionada!.Destrezas = newArrDestrezas
            this.messageError = 'Destreza Eliminada'
            this.typeAlert = 'success'
            this.showAlert(true)
          },
          error: () => {
            this.messageError = 'Hubo un error al eliminar la destreza'
            this.typeAlert = 'danger'
            this.showAlert(true)
          }
        })
    } else {
      this.destrezaService.deleteObjective(this.valueDelete)
        .subscribe({
          next: (objectiveResponse) => {
            const newArrObjectives = this.asignaturaSeleccionada!.Objectives.filter(objective => {
              return objective.id !== objectiveResponse.id
            })
            this.asignaturaSeleccionada!.Objectives = newArrObjectives
            this.messageError = 'Objetivo Eliminado'
            this.typeAlert = 'success'
            this.showAlert(true)
          },
          error: () => {
            this.messageError = 'Hubo un error al eliminar el objetivo'
            this.typeAlert = 'danger'
            this.showAlert(true)
          }
        })
    }
  }

  showMenu() {
    const listMenu = document.querySelector('.list-group-plus')
    listMenu?.classList.toggle('show')
  }

}

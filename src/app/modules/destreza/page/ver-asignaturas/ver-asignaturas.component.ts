import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AsignaturaList, Course, Destreza, Objective } from '../../interfaces/asignatura.interface';
import { DestrezaService } from '../../service/destreza.service';

import Swal from 'sweetalert2';

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
        error: (error) => {
          Swal.fire('Hubo un error al cargar las asignaturas', '', 'error')
        }
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

  async getDestreza(obj: Destreza) {
    this.isDestreza = true
    this.valueUpdate = obj
    const { value: Destreza, isConfirmed } = await Swal.fire({
      title: 'Actualizar Destreza',
      input: 'text',
      inputLabel: 'Destreza',
      inputValue: obj.nameDestreza,
      confirmButtonText: 'Guardar Cambios',
      showCancelButton: true
    })
    if (isConfirmed) {
      if (Destreza !== '') {
        this.valueInputUpdate = Destreza
        this.updateDestrezaObjetivo()
      } else {
        Swal.fire('La destreza no puede quedar vacio', '', 'error')
      }
    }
  }

  async getObjective(obj: Objective) {
    this.isDestreza = false
    this.valueUpdate = obj
    const { value: Objetivo, isConfirmed } = await Swal.fire({
      title: 'Actualizar Objetivo',
      input: 'text',
      inputLabel: 'Objetivo',
      inputValue: obj.nameObjective,
      confirmButtonText: 'Guardar Cambios',
      showCancelButton: true
    })
    if (isConfirmed) {
      if (Objetivo !== '') {
        this.valueInputUpdate = Objetivo
        this.updateDestrezaObjetivo()
      } else {
        Swal.fire('El objetivo no puede quedar vacio', '', 'error')
      }
    }
  }

  deleteDestreza(id: number) {
    this.isDestreza = true
    this.valueDelete = id
    Swal.fire({
      title: '¿Esta seguro que desea eliminar esta destreza?',
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteDestrezaObjetivo()
      }
    })
  }

  deleteObjetivo(id: number) {
    this.isDestreza = false
    this.valueDelete = id
    Swal.fire({
      title: '¿Esta seguro que desea eliminar este objetivo?',
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteDestrezaObjetivo()
      }
    })
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
            Swal.fire('Destreza actualizada', '', 'success')
          },
          error: (error) => {
            Swal.fire('Hubo un error al actualizar la destreza', '', 'error')
          }
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
            Swal.fire('Objetivo actualizado', '', 'success')
          },
          error: (error) => {
            Swal.fire('Hubo un error al actualizar el objetivo', '', 'error')
          }

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
            Swal.fire('Destreza eliminada', '', 'success')
          },
          error: () => {
            Swal.fire('Hubo un error al eliminar la destreza', '', 'error')
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
            Swal.fire('Objetivo eliminado', '', 'success')
          },
          error: () => {
            Swal.fire('Hubo un error al eliminar el objetivo', '', 'error')
          }
        })
    }
  }

  showMenu() {
    const listMenu = document.querySelector('.list-group-plus')
    listMenu?.classList.toggle('show')
  }

}

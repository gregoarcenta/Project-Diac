import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura, DestrezaElement, Objective } from '../../interfaces/destreza.interface';
import { DestrezaService } from '../../service/destreza.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-asignatura',
  templateUrl: './agregar-destreza.component.html',
  styleUrls: ['./agregar-destreza.component.css']
})
export class AgregarDestrezaComponent implements OnInit {

  messageError: string = ''
  typeAlert: string = ''
  alertActive: boolean = false

  asignatura!: Asignatura
  objectives: Objective[] = []
  destrezas: DestrezaElement[] = []

  idAsignatura!: number
  nombreAsignatura: string = ''
  valorActual: string = ''
  seleccionado: string = 'objetivo'

  constructor(private activateRoute: ActivatedRoute, private destrezaService: DestrezaService, private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(param => {
      this.nombreAsignatura = param['name']
      this.idAsignatura = param['idCourse']
    })
  }

  showAlert(value: boolean) {
    this.alertActive = value
  }

  cambioObjetivo(e: any) {
    this.seleccionado = e.target.id
  }

  addObjective() {
    let repetido: boolean = false
    if (!this.valorActual || this.valorActual.trim().length === 0) {
      this.messageError = 'La Objetivo no puede quedar vacio'
      this.typeAlert = 'danger'
      this.showAlert(true)
      return
    }
    this.objectives.forEach(objective => {
      if (objective.nameObjective === this.valorActual.trim().toLowerCase()) {
        repetido = true
        this.messageError = 'El objetivo ya existe!!'
        this.typeAlert = 'danger'
        this.showAlert(true)
      }
    })

    if (!repetido) {
      let objectivesCopy = [...this.objectives]
      this.objectives = [...objectivesCopy, { nameObjective: this.valorActual.trim().toLowerCase() }]
      this.valorActual = ''
      this.messageError = 'Objetivo agregado!'
      this.typeAlert = 'success'
      this.showAlert(true)
    }
  }

  addDestreza() {
    let repetido: boolean = false
    if (!this.valorActual || this.valorActual.trim().length === 0) {
      this.messageError = 'La destreza no puede quedar vacia'
      this.typeAlert = 'danger'
      this.showAlert(true)
      return
    }
    this.destrezas.forEach(destreza => {
      if (destreza.nameDestreza === this.valorActual.trim().toLowerCase()) {
        repetido = true
        this.messageError = 'La destreza ya existe!!'
        this.typeAlert = 'danger'
        this.showAlert(true)
      }
    })
    if (!repetido) {
      let destrezasCopy = [...this.destrezas]
      this.destrezas = [...destrezasCopy, { nameDestreza: this.valorActual.trim().toLowerCase() }]
      this.valorActual = ''
      this.messageError = 'Destreza agregada!'
      this.typeAlert = 'success'
      this.showAlert(true)
    }

  }

  deleteObjective(name: string) {
    this.messageError = 'Objetivo eliminado!'
    this.typeAlert = 'success'
    this.showAlert(true)
    this.objectives = this.objectives.filter(objective => {
      return objective.nameObjective !== name.toLowerCase()
    })
  }

  deleteDestreza(name: string) {
    this.messageError = 'Destreza eliminada!!'
    this.typeAlert = 'success'
    this.showAlert(true)
    this.destrezas = this.destrezas.filter(destreza => {
      return destreza.nameDestreza !== name.toLowerCase()
    })
  }

  addAsignatura() {
    if (this.destrezas.length === 0 && this.objectives.length === 0) {
      this.messageError = `Tiene que añadir alguna destreza u objetivo a la asignatura ${this.nombreAsignatura}`
      this.typeAlert = 'danger'
      this.showAlert(true)
      return
    }

    Swal.fire({
      title: '¿Guardar destrezas y objetivos?',
      text: `Se guardarán las destrezas y objetivos agregados a la asignatura ${this.nombreAsignatura}`,
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.destrezas.length > 0) {
          this.destrezaService.addDestreza(this.idAsignatura, this.destrezas)
            .subscribe({
              next: (resp) => { },
              error: ({ error }) => {
                Swal.fire('Hubo un error al guardar las destrezas', '', 'error')
              },
              complete: () => {
                Swal.fire(`Destrezas agregadas a la asignatura ${this.nombreAsignatura}`, '', 'success')
                this.router.navigateByUrl('/dashboard/asignatura')
              }
            })
        }

        if (this.objectives.length > 0) {
          this.destrezaService.addObjective(this.idAsignatura, this.objectives)
            .subscribe({
              next: (resp) => { },
              error: ({ error }) => {
                Swal.fire('Hubo un error al guardar los objetivos', '', 'error')
              },
              complete: () => {
                Swal.fire(`Objetivos agregados a la asignatura ${this.nombreAsignatura}`, '', 'success')
                this.router.navigateByUrl('/dashboard/asignatura')
              }
            })
        }

      }
    })

  }

}

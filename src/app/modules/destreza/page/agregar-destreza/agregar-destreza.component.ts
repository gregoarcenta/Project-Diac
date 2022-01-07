import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura, DestrezaElement, Objective } from '../../interfaces/destreza.interface';
import { DestrezaService } from '../../service/destreza.service';

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
      console.log(param);
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
    if (this.valorActual.trim().length === 0) {
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
    if (this.valorActual.trim().length === 0) {
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

  cancelarAsignatura() {
    this.router.navigateByUrl('/dashboard/asignatura')
  }

  addAsignatura() {
    if (this.destrezas.length === 0 && this.objectives.length === 0) {
      this.messageError = `Tiene que añadir alguna detreza u objetivo a la asignatura ${this.nombreAsignatura}`
      this.typeAlert = 'danger'
      this.showAlert(true)
      return
    }
    if (this.destrezas.length > 0) {
      this.destrezaService.addDestreza(this.idAsignatura, this.destrezas)
        .subscribe({
          next: (resp) => { },
          error: ({ error }) => {
            this.messageError = `${error.message}`
            this.typeAlert = 'danger'
            this.showAlert(true)
          },
          complete: () => {
            this.messageError = `Se agregaron las destrezas a la asignatura ${this.nombreAsignatura}`
            this.typeAlert = 'success'
            this.showAlert(true)
            this.router.navigateByUrl('/dashboard/asignatura')
          }
        })
    }

    if (this.objectives.length > 0) {
      this.destrezaService.addObjective(this.idAsignatura, this.objectives)
        .subscribe({
          next: (resp) => { },
          error: ({ error }) => {
            this.messageError = `${error.message}`
            this.typeAlert = 'danger'
            this.showAlert(true)
          },
          complete: () => {
            this.messageError = `Se agregaron los objetivos a la asignatura ${this.nombreAsignatura}`
            this.typeAlert = 'success'
            this.showAlert(true)
            this.router.navigateByUrl('/dashboard/asignatura')
          }
        })
    }

  }

}

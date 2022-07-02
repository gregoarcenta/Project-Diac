import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  Asignatura,
  Criteria,
  DestrezaElement,
  Objective,
} from "../../interfaces/destreza.interface";
import { DestrezaService } from "../../service/destreza.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-destreza",
  templateUrl: "./destreza.component.html",
  styleUrls: ["./destreza.component.css"],
})
export class DestrezaComponent implements OnInit {
  messageError: string = "";
  typeAlert: string = "";
  alertActive: boolean = false;

  asignatura!: Asignatura;
  objectives: Objective[] = [];
  criterios: Criteria[] = [];
  destrezas: DestrezaElement[] = [];

  nombreAsignatura: string = "";
  valorActual: string = "";
  seleccionado: string = "objetivo";

  constructor(
    private destrezaService: DestrezaService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  showAlert(value: boolean) {
    this.alertActive = value;
  }

  cambioObjetivo(e: any) {
    this.seleccionado = e.target.id;
  }

  addObjective() {
    let repetido: boolean = false;
    if (!this.valorActual || this.valorActual.trim().length === 0) {
      this.messageError = "La Objetivo no puede quedar vacio";
      this.typeAlert = "danger";
      this.showAlert(true);
      return;
    }
    this.objectives.forEach((objective) => {
      if (objective.nameObjective === this.valorActual.trim().toLowerCase()) {
        repetido = true;
        this.messageError = "El objetivo ya existe!!";
        this.typeAlert = "danger";
        this.showAlert(true);
      }
    });

    if (!repetido) {
      let objectivesCopy = [...this.objectives];
      this.objectives = [
        ...objectivesCopy,
        { nameObjective: this.valorActual.trim().toLowerCase() },
      ];
      this.valorActual = "";
      this.messageError = "Objetivo agregado!";
      this.typeAlert = "success";
      this.showAlert(true);
    }
  }

  addDestreza() {
    let repetido: boolean = false;
    if (!this.valorActual || this.valorActual.trim().length === 0) {
      this.messageError = "La destreza no puede quedar vacia";
      this.typeAlert = "danger";
      this.showAlert(true);
      return;
    }
    this.destrezas.forEach((destreza) => {
      if (destreza.nameDestreza === this.valorActual.trim().toLowerCase()) {
        repetido = true;
        this.messageError = "La destreza ya existe!!";
        this.typeAlert = "danger";
        this.showAlert(true);
      }
    });
    if (!repetido) {
      let destrezasCopy = [...this.destrezas];
      this.destrezas = [
        ...destrezasCopy,
        { nameDestreza: this.valorActual.trim().toLowerCase() },
      ];
      this.valorActual = "";
      this.messageError = "Destreza agregada!";
      this.typeAlert = "success";
      this.showAlert(true);
    }
  }

  addCriterio() {
    let repetido: boolean = false;
    if (!this.valorActual || this.valorActual.trim().length === 0) {
      this.messageError = "El criterio no puede quedar vacio";
      this.typeAlert = "danger";
      this.showAlert(true);
      return;
    }
    this.criterios.forEach((criterio) => {
      if (criterio.nameCriteria === this.valorActual.trim().toLowerCase()) {
        repetido = true;
        this.messageError = "El criterio ya existe!!";
        this.typeAlert = "danger";
        this.showAlert(true);
      }
    });
    if (!repetido) {
      let criteriosCopy = [...this.criterios];
      this.criterios = [
        ...criteriosCopy,
        { nameCriteria: this.valorActual.trim().toLowerCase() },
      ];
      this.valorActual = "";
      this.messageError = "Criterio agregado!";
      this.typeAlert = "success";
      this.showAlert(true);
    }
  }

  deleteObjective(name: string) {
    this.messageError = "Objetivo eliminado!";
    this.typeAlert = "success";
    this.showAlert(true);
    this.objectives = this.objectives.filter((objective) => {
      return objective.nameObjective !== name.toLowerCase();
    });
  }

  deleteDestreza(name: string) {
    this.messageError = "Destreza eliminada!!";
    this.typeAlert = "success";
    this.showAlert(true);
    this.destrezas = this.destrezas.filter((destreza) => {
      return destreza.nameDestreza !== name.toLowerCase();
    });
  }

  deleteCriterio(name: string) {
    this.messageError = "Criterio eliminado!!";
    this.typeAlert = "success";
    this.showAlert(true);
    this.criterios = this.criterios.filter((criterio) => {
      return criterio.nameCriteria !== name.toLowerCase();
    });
  }

  addAsignatura() {
    if (this.nombreAsignatura.trim().toLowerCase().length === 0) {
      this.messageError = "El nombre de la asignatura no puede quedar vacio";
      this.typeAlert = "danger";
      this.showAlert(true);
      return;
    }
    this.asignatura = {
      nameCourse: this.nombreAsignatura.toLowerCase(),
      destrezas: this.destrezas,
      objectives: this.objectives,
      criteria: this.criterios,
    };
    Swal.fire({
      title: "¿Guardar Asignatura?",
      text: `Se guardará la asignatura ${this.nombreAsignatura} con los objetivos y destrezas agregadas`,
      icon: "info",
      showDenyButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.destrezaService.addAsignatura(this.asignatura).subscribe({
          next: (resp) => {},
          error: ({ error }) => {
            Swal.fire("Hubo un error al guardar la asigantura", "", "error");
          },
          complete: () => {
            Swal.fire(
              `Se agregó la asignatura ${this.nombreAsignatura}`,
              "",
              "success"
            );
            this.router.navigateByUrl("/dashboard/asignatura");
          },
        });
      }
    });
  }

  toggleObjDezCri() {
    if (this.seleccionado === "destreza") {
      this.addDestreza();
    } else if (this.seleccionado === "objetivo") {
      this.addObjective();
    } else if (this.seleccionado === "criterio") {
      this.addCriterio();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/modules/destreza/interfaces/asignatura.interface';
import { DestrezaService } from 'src/app/modules/destreza/service/destreza.service';

@Component({
  selector: 'app-agregar-docente',
  templateUrl: './agregar-docente.component.html',
  styleUrls: ['./agregar-docente.component.css']
})
export class AgregarDocenteComponent implements OnInit {

  messageError: string = ''
  typeAlert: string = ''
  alertActive: boolean = false

  asignaturas: Course[] = []


  docenteForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    edad: ['', [Validators.required, Validators.min(1)]],
    email: ['', Validators.required],
    asignatura: ['0', Validators.required],
  })

  constructor(private courseService: DestrezaService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.courseService.allAsignaturas()
      .subscribe(asignaturas => this.asignaturas = asignaturas.courses)
  }

  showAlert(value: boolean) {
    this.alertActive = value
  }

  validCampo(campo: string) {
    if (this.docenteForm.controls[campo].errors && this.docenteForm.controls[campo].touched) {
      return { messagge: `El campo ${campo} es obligatorio`, valid: false }
    } else {
      return { messagge: null, valid: true }
    }
  }

  guardarDocente() {
    if (this.docenteForm.invalid) {
      this.docenteForm.markAllAsTouched()
      return
    }
    if (this.docenteForm.value.asignatura === '0') {
      this.messageError = 'Tiene que seleccionar una asignatura'
      this.typeAlert = 'danger'
      this.alertActive = true
      return
    } else {
      console.log(this.docenteForm.value);
      this.docenteForm.reset()
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-agregar-estudiante',
  templateUrl: './agregar-estudiante.component.html',
  styleUrls: ['./agregar-estudiante.component.css']
})
export class AgregarEstudianteComponent implements OnInit {

  messageError: string = ''
  typeAlert: string = ''
  alertActive: boolean = false

studianteFrom: FormGroup = this.fb.group({
  nombre: ['', Validators.required],
  apellido: ['', Validators.required],
  edad: ['', [Validators.required, Validators.min(1)]],
  fechaNacimiento: ['', Validators.required],
  NHermanos: ['', [Validators.required, Validators.min(1)]],
  LOcupa: ['', [Validators.required, Validators.min(1)]],
  tutor: ['', Validators.required],
  nombreMadre: ['', Validators.required],
  nombrePadre: ['', Validators.required],
  domicilio: ['', Validators.required],
  ciudad: ['0', Validators.required],
  Provincia: ['0', Validators.required],
  codigoPostal: ['', [Validators.required, Validators.min(1)]],
  telefono: ['', [Validators.required, Validators.min(1)]],
  course: ['', Validators.required],
  paralelo: ['', Validators.required],
  añolectivo: ['', Validators.required],
  
})

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  showAlert(value: boolean) {
    this.alertActive = value
  }

  validCampo(campo: string){
    if (this.studianteFrom.controls[campo].errors && this.studianteFrom.controls[campo].touched) {
      return { messagge: `El campo ${campo} es obligatorio`, valid: false }
    }
    else {
      return { messagge: null, valid: true }
    }
  }

  guardarEstudiante(){
    if(this.studianteFrom.invalid) {
      this.studianteFrom.markAllAsTouched()
      return
    }
    if (this.studianteFrom.value.ciudad == 0){
      this.messageError = 'Tiene que seleccionar una Ciudad'
      this.typeAlert = 'danger'
      this.alertActive = true
      return

    }if (this.studianteFrom.value.Provincia == 0){
      this.messageError = 'Tiene que seleccionar una Provincia'
      this.typeAlert = 'danger'
      this.alertActive = true
      return
    }
    else{
      console.log(this.studianteFrom.value);
      this.studianteFrom.reset()
    }
  }

}

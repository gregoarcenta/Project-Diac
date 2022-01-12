import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { StudentBodyCreate, EstudianteList } from '../../interfaces/registro-student.interface';
import { RegistroStudentService } from '../../service/registro-student.service';

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
  telefono: ['', [Validators.required]],
  course: ['', Validators.required],
  paralelo: ['', Validators.required],
  añolectivo: ['', Validators.required],
  
})

  constructor( private registroStudentService:RegistroStudentService, private fb: FormBuilder) { }

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
    const estudiante: StudentBodyCreate = {
 
    nameStudent: this.studianteFrom.value.nombre,
    lastNameStudent: this.studianteFrom.value.apellido,
    edad: this.studianteFrom.value.edad,
    dateOfBirth: this.studianteFrom.value.fechaNacimiento,
    numBrothers: this.studianteFrom.value.NHermanos,
    placeOccupies: this.studianteFrom.value.LOcupa,
    tutor: this.studianteFrom.value.tutor,
    nameFather: this.studianteFrom.value.nombreMadre,
    nameMother: this.studianteFrom.value.nombrePadre,
    address: this.studianteFrom.value.domicilio,
    town: this.studianteFrom.value.ciudad,
    province: this.studianteFrom.value.Provincia,
    postalCode: this.studianteFrom.value.codigoPostal,
    phone: this.studianteFrom.value.telefono,
    course: this.studianteFrom.value.course,
    parallel: this.studianteFrom.value.paralelo,
    schoolYear: this.studianteFrom.value.añolectivo,


    }
    this.registroStudentService.addEstudiante(estudiante)
    .subscribe({
      next: (resp) => console.log(resp),
      error: (err) => {
        this.messageError = 'Hubo un error al realizar el registro de un usuario'
        this.typeAlert = 'danger'
        this.alertActive = true
        console.log(err)
      },
      complete: () => {
        this.messageError = 'Estudiante registrado con exito'
        this.typeAlert = 'success'
        this.alertActive = true
        this.studianteFrom.reset()
      }
    })
  }


 /* guardarEstudiante(){
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
*/
}

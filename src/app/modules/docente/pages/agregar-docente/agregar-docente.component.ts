import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/modules/destreza/interfaces/asignatura.interface';
import { DestrezaService } from 'src/app/modules/destreza/service/destreza.service';
import { TeacherBodyCreate } from '../../interfaces/docente.interface';
import { UserBodyCreate } from '../../interfaces/user.interface';
import { DocenteService } from '../../services/docente.service';

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
  newDocenteId?: number


  docenteForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    edad: ['', [Validators.required, Validators.min(1)]],
    email: ['', Validators.required],
    asignatura: ['0', Validators.required],
    usuario: [''],
    contraseña: ['', Validators.minLength(6)],
    rol: ['0']
  })
  createUserSession: FormControl = this.fb.control(true)

  constructor(
    private courseService: DestrezaService,
    private docenteService: DocenteService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.courseService.allAsignaturas()
      .subscribe(asignaturas => this.asignaturas = asignaturas.courses)
  }

  showAlert(value: boolean) {
    this.alertActive = value
  }

  validCampo(campo: string) {
    if (campo === 'contraseña' && this.docenteForm.controls['contraseña'].errors?.['minlength']) {
      return { messagge: `La ${campo} debe tener al menos 6 caracteres`, valid: false }
    }
    if (this.docenteForm.controls[campo].errors && this.docenteForm.controls[campo].touched) {
      return { messagge: `El campo ${campo} es obligatorio`, valid: false }
    } else {
      return { messagge: null, valid: true }
    }
  }

  guardarDocente() {
    const docente: TeacherBodyCreate = {
      nameTeacher: this.docenteForm.value.nombre,
      lastNameTeacher: this.docenteForm.value.apellido,
      edad: this.docenteForm.value.edad,
      email: this.docenteForm.value.email,
      courseId: parseInt(this.docenteForm.value.asignatura),
    }
    this.docenteService.addDocente(docente)
      .subscribe({
        next: (resp) => {
          if (this.createUserSession.value) {
            const user: UserBodyCreate = {
              username: this.docenteForm.value.usuario,
              password: this.docenteForm.value.contraseña,
              idRole: this.docenteForm.value.rol,
              idTeacher: resp.id
            }
            this.docenteService.addUser(user)
              .subscribe({
                next: (resp) => console.log(resp),
                error: (err) => {
                  this.messageError = 'Hubo un error al realizar el registro del usuario'
                  this.typeAlert = 'danger'
                  this.alertActive = true
                  console.log(err)
                },
                complete: () => {
                  this.messageError = 'Usuario registrado con exito'
                  this.typeAlert = 'success'
                  this.alertActive = true
                  this.docenteForm.reset()
                }
              })
          }
        },
        error: (err) => {
          this.messageError = 'Hubo un error al realizar el registro'
          this.typeAlert = 'danger'
          this.alertActive = true
          console.log(err)
        },
        complete: () => {
          this.messageError = 'Docente registrado con exito'
          this.typeAlert = 'success'
          this.alertActive = true
          this.docenteForm.reset()
        }
      })
  }

  guardarDocenteUser() {
    if (this.docenteForm.invalid) {
      this.docenteForm.markAllAsTouched()
      return
    }
    if (this.docenteForm.value.asignatura === '0') {
      this.messageError = 'Tiene que seleccionar una asignatura'
      this.typeAlert = 'danger'
      this.alertActive = true
      return
    }
    if (this.createUserSession.value) {
      if (this.docenteForm.value.usuario === '') {
        this.docenteForm.controls['usuario'].setErrors(Validators.required)
        return
      }
      if (this.docenteForm.value.contraseña === '') {
        this.docenteForm.controls['contraseña'].setErrors(Validators.required)
        return
      }
      if (this.docenteForm.value.rol === '0') {
        this.messageError = 'Tiene que seleccionar un rol para el usuario'
        this.typeAlert = 'danger'
        this.alertActive = true
        return
      }
    } else {
      this.guardarDocente()
    }
    this.guardarDocente()
  }

}

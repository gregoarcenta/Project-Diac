import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  //variables para el modal
  showModal: boolean = false

  asignaturas: Course[] = []

  nameUser: string = ''

  docenteForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    edad: ['', [Validators.required, Validators.min(1)]],
    email: ['', Validators.required],
    asignatura: ['0', Validators.required],
    usuario: ['', Validators.required],
    contraseña: ['', [Validators.minLength(6), Validators.required]],
    rol: ['0']
  })

  constructor(
    private router: Router,
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

  changeUser() {
    const emailValue = this.docenteForm.value.email
    if (emailValue) {
      const indexEmail = emailValue.indexOf('@')
      this.nameUser = emailValue.substring(0, indexEmail)
      this.docenteForm.controls['usuario'].setValue(this.nameUser)
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
          const user: UserBodyCreate = {
            username: this.docenteForm.value.usuario,
            password: this.docenteForm.value.contraseña,
            idRole: this.docenteForm.value.rol,
            idTeacher: resp.id
          }
          this.docenteService.addUser(user)
            .subscribe({
              next: (resp) => { },
              error: (err) => {
                this.closeModal()
                this.messageError = 'Hubo un error al realizar el registro del usuario'
                this.typeAlert = 'danger'
                this.alertActive = true
              },
              complete: () => {
                this.closeModal()
                this.messageError = 'Usuario registrado con exito'
                this.typeAlert = 'success'
                this.alertActive = true
                this.docenteForm.reset()
              }
            })
        },
        error: (err) => {
          this.closeModal()
          this.messageError = err.error.message
          this.typeAlert = 'danger'
          this.alertActive = true
        },
        complete: () => {
          this.closeModal()
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
    if (!this.docenteForm.value.asignatura || this.docenteForm.value.asignatura === '0') {
      this.messageError = 'Tiene que seleccionar una asignatura'
      this.typeAlert = 'danger'
      this.alertActive = true
      return
    }
    if (!this.docenteForm.value.rol || this.docenteForm.value.rol === '0') {
      this.messageError = 'Tiene que seleccionar un rol para el usuario'
      this.typeAlert = 'danger'
      this.alertActive = true
      return
    }
    this.openModal()
  }

  openModal() {
    this.showModal = true
  }

  closeModal() {
    this.showModal = false
  }

  cancelarDocente() {
    this.router.navigateByUrl('/dashboard/docente')
  }

}

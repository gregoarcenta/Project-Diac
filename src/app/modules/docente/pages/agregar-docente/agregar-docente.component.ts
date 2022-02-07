import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Course } from 'src/app/modules/destreza/interfaces/asignatura.interface';
import { TeacherBodyCreate } from '../../interfaces/docente.interface';
import { UserBodyCreate } from '../../interfaces/user.interface';

import { DestrezaService } from 'src/app/modules/destreza/service/destreza.service';
import { DocenteService } from '../../services/docente.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-docente',
  templateUrl: './agregar-docente.component.html',
  styleUrls: ['./agregar-docente.component.css']
})
export class AgregarDocenteComponent implements OnInit {

  asignaturas: Course[] = []

  nameUser: string = ''

  docenteForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    edad: ['', [Validators.required, Validators.min(1)]],
    email: ['', Validators.required],
    asignatura: ['0'],
    usuario: ['', Validators.required],
    contraseña: ['', [Validators.minLength(6), Validators.required]],
    rol: ['0']
  })

  constructor(
    private courseService: DestrezaService,
    private docenteService: DocenteService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.courseService.allAsignaturas()
      .subscribe(asignaturas => this.asignaturas = asignaturas.courses)
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

  validSelect(campo: string) {
    if ((!this.docenteForm.controls[campo].value || this.docenteForm.controls[campo].value === '0') && this.docenteForm.controls[campo].touched) {
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

  guardarDocenteConfirm() {
    const nombreDocente = this.docenteForm.value.nombre
    const apellidoDocente = this.docenteForm.value.apellido
    const usuario = this.docenteForm.value.usuario

    if (this.docenteForm.invalid) {
      this.docenteForm.markAllAsTouched()
      return
    }
    if (!(this.validSelect('rol').valid) || !(this.validSelect('asignatura').valid)) {
      return
    }

    Swal.fire({
      title: '¿Guardar Registro?',
      text: `Se guardará el docente ${nombreDocente} ${apellidoDocente} con el usuario ${usuario}`,
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.guardarDocente()
      }
    })

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
                Swal.fire('Hubo un error al realizar el registro', '', 'error')
              },
              complete: () => {
                Swal.fire('Docente Guardado', '', 'success')
                this.docenteForm.reset()
              }
            })
        },
        error: (err) => {
          Swal.fire(err.error.message, '', 'error')
        },
        complete: () => {
          Swal.fire('Docente Guardado', '', 'success')
          this.docenteForm.reset()
        }
      })
  }


}

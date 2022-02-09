import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/modules/destreza/interfaces/asignatura.interface';
import { DestrezaService } from 'src/app/modules/destreza/service/destreza.service';
import { Teacher, TeacherBodyCreate } from '../../interfaces/docente.interface';
import { DocenteService } from '../../services/docente.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-docente-list',
  templateUrl: './docente-list.component.html',
  styleUrls: ['./docente-list.component.css']
})
export class DocenteListComponent implements OnInit {
  docenteList: Teacher[] = []
  asignaturas: Course[] = []
  nameUser: string = ''

  docenteForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    edad: ['', [Validators.required, Validators.min(1)]],
    email: ['', Validators.required],
    asignatura: ['0']
  })
  //variables de actualizacion
  docenteUpdate!: TeacherBodyCreate
  idDocenteUpdate!: number

  //------paginacion----
  pageActual: number = 1;

  constructor(
    private docenteService: DocenteService,
    private courseService: DestrezaService,
    private fb: FormBuilder
  ) { }

  // -------filtro de pipe
  filterDocente = '';

  ngOnInit(): void {
    this.docenteService.getDocentes()
      .subscribe(docentes => this.docenteList = docentes.teachers)
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

  openModalUpdate({ id }: Teacher) {
    this.idDocenteUpdate = id
    this.docenteList.forEach(docente => {
      if (docente.id === id) {
        this.docenteUpdate = {
          nameTeacher: docente.nameTeacher,
          lastNameTeacher: docente.lastNameTeacher,
          email: docente.email,
          edad: docente.edad,
          courseId: docente.CourseId
        }
      }
    })
    this.docenteForm.controls['nombre'].setValue(this.docenteUpdate.nameTeacher)
    this.docenteForm.controls['apellido'].setValue(this.docenteUpdate.lastNameTeacher)
    this.docenteForm.controls['edad'].setValue(this.docenteUpdate.edad)
    this.docenteForm.controls['email'].setValue(this.docenteUpdate.email)
    this.docenteForm.controls['asignatura'].setValue(this.docenteUpdate.courseId)
  }

  updateDocenteConfirm() {
    const nombreDocente = this.docenteForm.value.nombre
    const apellidoDocente = this.docenteForm.value.apellido

    if (this.docenteForm.invalid) {
      this.docenteForm.markAllAsTouched()
      return
    }
    if (!(this.validSelect('asignatura').valid)) {
      return
    }

    Swal.fire({
      title: '¿Actualizar Docente?',
      text: `Se actualizará el docente ${nombreDocente} ${apellidoDocente}`,
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'Guardar Cambios',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarDocente()
      }
    })

  }

  actualizarDocente() {
    const docente: TeacherBodyCreate = {
      nameTeacher: this.docenteForm.value.nombre,
      lastNameTeacher: this.docenteForm.value.apellido,
      edad: this.docenteForm.value.edad,
      email: this.docenteForm.value.email,
      courseId: parseInt(this.docenteForm.value.asignatura),
    }
    this.docenteService.updateDocente(this.idDocenteUpdate, docente)
      .subscribe({
        next: (resp) => { },
        error: (err) => {
          Swal.fire(err.error.message, '', 'error')
        },
        complete: () => {
          Swal.fire('Docente Actualizado', '', 'success')
          document.getElementById('closeModal')?.click()
          this.docenteService.getDocentes()
            .subscribe(docentes => this.docenteList = docentes.teachers)
        }
      })
  }

  eliminarDocente(id: number) {
    Swal.fire({
      title: '¿Estas seguro de eliminar el docente?',
      text: "El docente será eliminado permanentemente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar docente!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.docenteService.eliminarDocente(id)
          .subscribe({
            next: () => { },
            error: () => {
              Swal.fire('Ups! Hubo un error al eliminar el docente', '', 'error')
            },
            complete: () => {
              Swal.fire('Docente Eliminado', '', 'success')
              this.docenteService.getDocentes()
                .subscribe(institucion => this.docenteList = institucion.teachers)
            }
          })
      }
    })
  }

  showMenu() {
    const listMenu = document.querySelector('.list-group-plus')
    listMenu?.classList.toggle('show')
  }



}

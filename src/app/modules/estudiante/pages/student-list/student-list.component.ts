import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from '../../service/estudiante.service';
import { RegistroStudent, StudentBodyCreate } from '../../interfaces/registro-student.interface';
///importaciones del pdf --------------------------
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//-----
import jsPDF from 'jspdf';

import html2canvas from 'html2canvas';
//-----------------------------------------------

import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  estudianteList: RegistroStudent[] = []

  estudianteForm: FormGroup = this.fb.group({
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
    ciudad: ['0'],
    Provincia: ['0'],
    codigoPostal: ['', [Validators.required, Validators.min(1)]],
    telefono: ['', [Validators.required]],
    course: ['', Validators.required],
    paralelo: ['', Validators.required],
    añolectivo: ['', Validators.required],
  })

  //variables de actualizacion
  estudianteUpdate!: StudentBodyCreate
  idEstudianteUpdate!: number

  //----paginacion
  pageActual: number = 1;

  constructor(private estudianteService: EstudianteService, private fb: FormBuilder) { }

  // -------filtro de pipe
  filterEstudiante = '';

  ngOnInit(): void {
    this.estudianteService.getStudent()
      .subscribe(estudiantes => this.estudianteList = estudiantes.students)
  }

  validCampo(campo: string) {
    if (this.estudianteForm.controls[campo].errors && this.estudianteForm.controls[campo].touched) {
      return { messagge: `El campo ${campo} es obligatorio`, valid: false }
    }
    else {
      return { messagge: null, valid: true }
    }
  }

  validSelect(campo: string) {
    if ((!this.estudianteForm.controls[campo].value || this.estudianteForm.controls[campo].value === '0') && this.estudianteForm.controls[campo].touched) {
      return { messagge: `El campo ${campo} es obligatorio`, valid: false }
    } else {
      return { messagge: null, valid: true }
    }
  }

  openModalUpdate({ id }: RegistroStudent) {
    this.idEstudianteUpdate = id
    this.estudianteList.forEach(estudiante => {
      if (estudiante.id === id) {
        this.estudianteUpdate = {
          nameStudent: estudiante.nameStudent,
          lastNameStudent: estudiante.lastNameStudent,
          edad: estudiante.edad,
          dateOfBirth: estudiante.dateOfBirth,
          numBrothers: estudiante.numBrothers,
          placeOccupies: estudiante.placeOccupies,
          tutor: estudiante.tutor,
          nameFather: estudiante.nameFather,
          nameMother: estudiante.nameMother,
          address: estudiante.address,
          town: estudiante.town,
          province: estudiante.province,
          postalCode: estudiante.postalCode,
          phone: estudiante.phone,
          course: estudiante.course,
          parallel: estudiante.parallel,
          schoolYear: estudiante.schoolYear,
        }
      }
    })
    this.estudianteForm.controls['nombre'].setValue(this.estudianteUpdate.nameStudent)
    this.estudianteForm.controls['apellido'].setValue(this.estudianteUpdate.lastNameStudent)
    this.estudianteForm.controls['edad'].setValue(this.estudianteUpdate.edad)
    this.estudianteForm.controls['NHermanos'].setValue(this.estudianteUpdate.numBrothers)
    this.estudianteForm.controls['LOcupa'].setValue(this.estudianteUpdate.placeOccupies)
    this.estudianteForm.controls['tutor'].setValue(this.estudianteUpdate.tutor)
    this.estudianteForm.controls['nombreMadre'].setValue(this.estudianteUpdate.nameMother)
    this.estudianteForm.controls['nombrePadre'].setValue(this.estudianteUpdate.nameFather)
    this.estudianteForm.controls['domicilio'].setValue(this.estudianteUpdate.address)
    this.estudianteForm.controls['ciudad'].setValue(this.estudianteUpdate.town)
    this.estudianteForm.controls['Provincia'].setValue(this.estudianteUpdate.province)
    this.estudianteForm.controls['codigoPostal'].setValue(this.estudianteUpdate.postalCode)
    this.estudianteForm.controls['telefono'].setValue(this.estudianteUpdate.phone)
    this.estudianteForm.controls['course'].setValue(this.estudianteUpdate.course)
    this.estudianteForm.controls['paralelo'].setValue(this.estudianteUpdate.parallel)
    this.estudianteForm.controls['añolectivo'].setValue(this.estudianteUpdate.schoolYear)
    this.estudianteForm.controls['fechaNacimiento'].setValue(this.estudianteUpdate.dateOfBirth)
  }

  updateEstudianteConfirm() {
    const nombre = this.estudianteForm.value.nombre
    const apellido = this.estudianteForm.value.apellido

    if (this.estudianteForm.invalid) {
      this.estudianteForm.markAllAsTouched()
      return
    }
    if (!(this.validSelect('ciudad').valid) || !(this.validSelect('Provincia').valid)) {
      return
    }

    Swal.fire({
      title: '¿Actualizar Estudiante?',
      text: `Se actualizará el estudiante ${nombre} ${apellido}`,
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'Guardar Cambios',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarEstudiante()
      }
    })
  }

  actualizarEstudiante() {
    const estudiante: StudentBodyCreate = {
      nameStudent: this.estudianteForm.value.nombre,
      lastNameStudent: this.estudianteForm.value.apellido,
      edad: this.estudianteForm.value.edad,
      dateOfBirth: this.estudianteForm.value.fechaNacimiento,
      numBrothers: this.estudianteForm.value.NHermanos,
      placeOccupies: this.estudianteForm.value.LOcupa,
      tutor: this.estudianteForm.value.tutor,
      nameFather: this.estudianteForm.value.nombrePadre,
      nameMother: this.estudianteForm.value.nombreMadre,
      address: this.estudianteForm.value.domicilio,
      town: this.estudianteForm.value.ciudad,
      province: this.estudianteForm.value.Provincia,
      postalCode: this.estudianteForm.value.codigoPostal,
      phone: this.estudianteForm.value.telefono,
      course: this.estudianteForm.value.course,
      parallel: this.estudianteForm.value.paralelo,
      schoolYear: this.estudianteForm.value.añolectivo,
    }

    this.estudianteService.updateEstudiante(this.idEstudianteUpdate, estudiante)
      .subscribe({
        next: (resp) => console.log(resp),
        error: (err) => {
          Swal.fire('Error al actualizar el estudiante', '', 'error')
        },
        complete: () => {
          Swal.fire('Estudiante Actualizado', '', 'success')
          document.getElementById('closeModal')?.click()
          this.estudianteService.getStudent()
            .subscribe(estudiantes => this.estudianteList = estudiantes.students)
        }
      })
  }

  eliminarEstudiante(id: number) {
    Swal.fire({
      title: '¿Estas seguro de eliminar el estudiante?',
      text: "El estudiante será eliminado permanentemente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar estudiante!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.estudianteService.eliminarEstudiante(id)
          .subscribe({
            next: () => { },
            error: () => {
              Swal.fire('Ups! Hubo un error al eliminar el estudiante', '', 'error')
            },
            complete: () => {
              Swal.fire('Estudiante Eliminado', '', 'success')
              this.estudianteService.getStudent()
                .subscribe(estudiantes => this.estudianteList = estudiantes.students)
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

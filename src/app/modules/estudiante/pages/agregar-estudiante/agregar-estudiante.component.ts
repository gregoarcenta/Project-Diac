import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentBodyCreate } from '../../interfaces/registro-student.interface';
import { EstudianteService } from '../../service/estudiante.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-estudiante',
  templateUrl: './agregar-estudiante.component.html',
  styleUrls: ['./agregar-estudiante.component.css']
})
export class AgregarEstudianteComponent implements OnInit {

  estudianteFrom: FormGroup = this.fb.group({
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

  constructor(private estudianteService: EstudianteService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  validCampo(campo: string) {
    if (this.estudianteFrom.controls[campo].errors && this.estudianteFrom.controls[campo].touched) {
      return { messagge: `El campo ${campo} es obligatorio`, valid: false }
    }
    else {
      return { messagge: null, valid: true }
    }
  }

  validSelect(campo: string) {
    if ((!this.estudianteFrom.controls[campo].value || this.estudianteFrom.controls[campo].value === '0') && this.estudianteFrom.controls[campo].touched) {
      return { messagge: `El campo ${campo} es obligatorio`, valid: false }
    } else {
      return { messagge: null, valid: true }
    }
  }

  guardarEstudianteConfirm() {
    const nombre = this.estudianteFrom.value.nombre
    const apellido = this.estudianteFrom.value.apellido

    if (this.estudianteFrom.invalid) {
      this.estudianteFrom.markAllAsTouched()
      return
    }
    if (!(this.validSelect('ciudad').valid) || !(this.validSelect('Provincia').valid)) {
      return
    }

    Swal.fire({
      title: '¿Guardar Registro?',
      text: `Se guardará el estudiante ${nombre} ${apellido}`,
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.guardarEstudiante()
      }
    })


  }


  guardarEstudiante() {
    const estudiante: StudentBodyCreate = {
      nameStudent: this.estudianteFrom.value.nombre,
      lastNameStudent: this.estudianteFrom.value.apellido,
      edad: this.estudianteFrom.value.edad,
      dateOfBirth: this.estudianteFrom.value.fechaNacimiento,
      numBrothers: this.estudianteFrom.value.NHermanos,
      placeOccupies: this.estudianteFrom.value.LOcupa,
      tutor: this.estudianteFrom.value.tutor,
      nameFather: this.estudianteFrom.value.nombrePadre,
      nameMother: this.estudianteFrom.value.nombreMadre,
      address: this.estudianteFrom.value.domicilio,
      town: this.estudianteFrom.value.ciudad,
      province: this.estudianteFrom.value.Provincia,
      postalCode: this.estudianteFrom.value.codigoPostal,
      phone: this.estudianteFrom.value.telefono,
      course: this.estudianteFrom.value.course,
      parallel: this.estudianteFrom.value.paralelo,
      schoolYear: this.estudianteFrom.value.añolectivo,
    }

    this.estudianteService.addEstudiante(estudiante)
      .subscribe({
        next: (resp) => console.log(resp),
        error: (err) => {
          Swal.fire('Error al realizar el registro', '', 'error')
        },
        complete: () => {
          Swal.fire('Estudiante Guardado', '', 'success')
          this.estudianteFrom.reset()
        }
      })
  }

}

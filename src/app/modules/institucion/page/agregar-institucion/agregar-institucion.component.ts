import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstitutionBodyCreate } from '../../interfaces/institution.interface';
import { InstitucionService } from '../../services/institucion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-institucion',
  templateUrl: './agregar-institucion.component.html',
  styleUrls: ['./agregar-institucion.component.css']
})
export class AgregarInstitucionComponent implements OnInit {

  institucionForm: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    distrito: ['', Validators.required],
    direccion: ['', Validators.required],
    localizacion: ['', Validators.required],
    codigoPostal: ['', Validators.required],
    telefono: ['', Validators.required],
    modalidad: ['0', Validators.required],
    tipo: ['0', Validators.required]
  })

  constructor(
    private institucionService: InstitucionService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void { }

  validCampo(campo: string) {
    if (this.institucionForm.controls[campo].errors && this.institucionForm.controls[campo].touched) {
      return { messagge: `El campo ${campo} es obligatorio`, valid: false }
    } else {
      return { messagge: null, valid: true }
    }
  }

  validSelect(campo: string) {
    if ((!this.institucionForm.controls[campo].value || this.institucionForm.controls[campo].value === '0') && this.institucionForm.controls[campo].touched) {
      return { messagge: `El campo ${campo} es obligatorio`, valid: false }
    } else {
      return { messagge: null, valid: true }
    }
  }

  guardarInstitucionConfirm() {
    const nombreIntitucion = this.institucionForm.value.nombre
    if (this.institucionForm.invalid) {
      this.institucionForm.markAllAsTouched()
      return
    }
    if (!(this.validSelect('tipo').valid) || !(this.validSelect('modalidad').valid)) {
      return
    }
    Swal.fire({
      title: '¿Guardar Registro?',
      text: `Se guardará la institución ${nombreIntitucion}`,
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.guardarInstitucion()
      }
    })

  }

  guardarInstitucion() {
    const institucion: InstitutionBodyCreate = {
      nameInstitution: this.institucionForm.value.nombre,
      district: this.institucionForm.value.distrito,
      address: this.institucionForm.value.direccion,
      locationInstitution: this.institucionForm.value.localizacion,
      postalCode: this.institucionForm.value.codigoPostal,
      phone: this.institucionForm.value.telefono,
      modality: this.institucionForm.value.modalidad,
      type: this.institucionForm.value.tipo,
    }
    this.institucionService.addInstitution(institucion)
      .subscribe({
        next: (resp) => { },
        error: (err) => {
          Swal.fire('Hubo un error al realizar el registro', '', 'error')
        },
        complete: () => {
          Swal.fire('Institución Guardada', '', 'success')
          this.institucionForm.reset()
        }
      })
  }

}

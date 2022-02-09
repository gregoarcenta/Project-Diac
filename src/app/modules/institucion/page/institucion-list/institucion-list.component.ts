import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Institution, InstitutionBodyCreate } from '../../interfaces/institution.interface';
import { InstitucionService } from '../../services/institucion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-institucion-list',
  templateUrl: './institucion-list.component.html',
  styleUrls: ['./institucion-list.component.css']
})
export class InstitucionListComponent implements OnInit {

  institucionList: Institution[] = []

  institucionForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    distrito: ['', Validators.required],
    direccion: ['', Validators.required],
    localizacion: ['', Validators.required],
    codigoPostal: ['', Validators.required],
    telefono: ['', Validators.required],
    modalidad: ['0'],
    tipo: ['0']
  })
  //variables de actualizacion
  institucionUpdate!: InstitutionBodyCreate
  idInstitucionUpdate!: number

  //------paginacion----
  pageActual: number = 1;

  constructor(private institucionService: InstitucionService, private fb: FormBuilder) { }

  // -------filtro de pipe
  filterInstitucion = '';

  ngOnInit(): void {
    this.institucionService.getInstitutions()
      .subscribe(instituciones => this.institucionList = instituciones.institutions)
  }

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

  openModalUpdate({ id }: Institution) {
    this.idInstitucionUpdate = id
    this.institucionList.forEach(institucion => {
      if (institucion.id === id) {
        this.institucionUpdate = {
          address: institucion.address,
          district: institucion.district,
          locationInstitution: institucion.locationInstitution,
          modality: institucion.modality,
          nameInstitution: institucion.nameInstitution,
          phone: institucion.phone,
          postalCode: institucion.postalCode,
          type: institucion.type
        }
      }
    })
    this.institucionForm.controls['nombre'].setValue(this.institucionUpdate.nameInstitution)
    this.institucionForm.controls['distrito'].setValue(this.institucionUpdate.district)
    this.institucionForm.controls['direccion'].setValue(this.institucionUpdate.address)
    this.institucionForm.controls['localizacion'].setValue(this.institucionUpdate.locationInstitution)
    this.institucionForm.controls['codigoPostal'].setValue(this.institucionUpdate.postalCode)
    this.institucionForm.controls['telefono'].setValue(this.institucionUpdate.phone)
    this.institucionForm.controls['modalidad'].setValue(this.institucionUpdate.modality)
    this.institucionForm.controls['tipo'].setValue(this.institucionUpdate.type)
  }

  updateInstitucionConfirm() {
    const nombreIntitucion = this.institucionForm.value.nombre

    if (this.institucionForm.invalid) {
      this.institucionForm.markAllAsTouched()
      return
    }
    if (!(this.validSelect('modalidad').valid) || !(this.validSelect('tipo').valid)) {
      return
    }

    Swal.fire({
      title: '¿Actualizar Institución?',
      text: `Se actualizará la institucion ${nombreIntitucion}`,
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'Guardar Cambios',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarInstitucion()
      }
    })

  }

  actualizarInstitucion() {
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
    this.institucionService.updateInstitution(this.idInstitucionUpdate, institucion)
      .subscribe({
        next: (resp) => { },
        error: (err) => {
          Swal.fire('Error al actualizar la institución', '', 'error')
        },
        complete: () => {
          Swal.fire('Institución Actualizada', '', 'success')
          document.getElementById('closeModal')?.click()
          this.institucionService.getInstitutions()
            .subscribe(instituciones => this.institucionList = instituciones.institutions)
        }
      })
  }

  eliminarInstitucion(id: number) {
    Swal.fire({
      title: '¿Estas seguro de eliminar la institución?',
      text: "La institución será eliminado permanentemente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar Institución!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.institucionService.eliminarInstitucion(id)
          .subscribe({
            next: () => { },
            error: () => {
              Swal.fire('Ups! Hubo un error al eliminar la Institución', '', 'error')
            },
            complete: () => {
              Swal.fire('Institución Eliminada', '', 'success')
              this.institucionService.getInstitutions()
                .subscribe(estudiantes => this.institucionList = estudiantes.institutions)
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

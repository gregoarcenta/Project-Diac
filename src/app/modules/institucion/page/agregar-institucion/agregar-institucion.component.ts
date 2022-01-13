import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstitutionBodyCreate } from '../../interfaces/institution.interface';
import { InstitucionService } from '../../services/institucion.service';

@Component({
  selector: 'app-agregar-institucion',
  templateUrl: './agregar-institucion.component.html',
  styleUrls: ['./agregar-institucion.component.css']
})
export class AgregarInstitucionComponent implements OnInit {

  messageError: string = ''
  typeAlert: string = ''
  alertActive: boolean = false

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

  showAlert(value: boolean) {
    this.alertActive = value
  }

  validCampo(campo: string) {
    if (this.institucionForm.controls[campo].errors && this.institucionForm.controls[campo].touched) {
      return { messagge: `El campo ${campo} es obligatorio`, valid: false }
    } else {
      return { messagge: null, valid: true }
    }
  }

  guardarInstitucion() {
    if (this.institucionForm.invalid) {
      this.institucionForm.markAllAsTouched()
      return
    }
    if (this.institucionForm.value.modalidad === '0') {
      this.messageError = 'Tiene que seleccionar una modalidad'
      this.typeAlert = 'danger'
      this.alertActive = true
      return
    }
    if (this.institucionForm.value.tipo === '0') {
      this.messageError = 'Tiene que seleccionar un tipo'
      this.typeAlert = 'danger'
      this.alertActive = true
      return
    }
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
        next: (resp) => console.log(resp),
        error: (err) => {
          this.messageError = 'Hubo un error al realizar el registro'
          this.typeAlert = 'danger'
          this.alertActive = true
          console.log(err)
        },
        complete: () => {
          this.messageError = 'Institucion registrada con exito'
          this.typeAlert = 'success'
          this.alertActive = true
          this.institucionForm.reset()
        }
      })
  }

}

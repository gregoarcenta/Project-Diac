import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroStudent } from '../../estudiante/interfaces/registro-student.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterDocumentCurricularService {

  estudianteSeleccionado?: RegistroStudent

  docCurricularForm: FormGroup = this.fb.group({
    idStudent: ['']
  })

  constructor(private fb: FormBuilder) { }

  validateStudent() {
    return this.docCurricularForm.value.idStudent !== ''
  }

}

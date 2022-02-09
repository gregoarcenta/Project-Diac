import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../destreza/interfaces/asignatura.interface';
import { Teacher } from '../../docente/interfaces/docente.interface';
import { RegistroStudent } from '../../estudiante/interfaces/registro-student.interface';
import { Institution } from '../../institucion/interfaces/institution.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterDocumentCurricularService {

  estudianteSeleccionado?: RegistroStudent
  institucionSeleccionada?: Institution
  asignaturasSeleccionadas: number[] = []
  docentesSeleccionados: number[] = []

  docenteListSelected: Teacher[] = []

  docCurricularForm: FormGroup = this.fb.group({
    idStudent: [''],
    idInstitution: [''],
    duration: ['', Validators.required],
    infPhicopedagogico: ['', Validators.required],
    dateDevelopment: ['', Validators.required],
    antecedentes: ['', Validators.required],
    history: ['', Validators.required],
    stylelearning: ['', Validators.required],
    tipeIntelligence: ['', Validators.required],
    contextEducation: ['', Validators.required],
    contextFamily: ['', Validators.required],
    contextSocial: ['', Validators.required],
  })

  constructor(private fb: FormBuilder) { }

  validateStudent() {
    return this.docCurricularForm.value.idStudent !== ''
  }

  validateInstitution() {
    return this.docCurricularForm.value.idInstitution !== ''
  }

  validateElaborationDate() {
    return this.docCurricularForm.value.duration !== ''
  }

  validateCoursesSelect() {
    return this.asignaturasSeleccionadas.length > 0
  }

  validateDocentesSelect() {
    return this.docentesSeleccionados.length > 0
  }

  validateInfoPedagogico() {
    return this.docCurricularForm.value.infPhicopedagogico !== ''
  }

  validateInfoHistoryPersonal() {
    return this.docCurricularForm.value.dateDevelopment !== '' && this.docCurricularForm.value.antecedentes !== '' && this.docCurricularForm.value.history !== '' && this.docCurricularForm.value.stylelearning !== '' && this.docCurricularForm.value.tipeIntelligence !== ''
  }

  validateContextEducation() {
    return this.docCurricularForm.value.contextEducation !== ''
  }

  validateContextFamily() {
    return this.docCurricularForm.value.contextFamily !== ''
  }

  validateContextSocial() {
    return this.docCurricularForm.value.contextSocial !== ''
  }

}

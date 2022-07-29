import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../../destreza/interfaces/asignatura.interface';
import { Teacher } from '../../docente/interfaces/docente.interface';
import { RegistroStudent } from '../../estudiante/interfaces/registro-student.interface';
import { Institution } from '../../institucion/interfaces/institution.interface';
import { DocumentBodyCreate } from '../interfaces/Items-estudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterDocumentCurricularService {

  estudianteSeleccionado?: RegistroStudent
  institucionSeleccionada?: Institution

  //Variables para cuerpo de la peticion POST al documento curricular
  asignaturasSeleccionadas: number[] = []
  docentesSeleccionados: number[] = []
  recursosSeleccionados: string[] = []
  profesionalesSeleccionados: string[] = []
  objetivosSeleccionados: number[] = []

  docenteListSelected: Teacher[] = []
  asignaturaListSelected: Course[] = []

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
    educationalNeed: ['', Validators.required],
    //punto 14
    grade: ['', Validators.required],
    ente: ['', Validators.required],
    toDo: ['', Validators.required],
    howToDo: ['', Validators.required],
    //punto 15
    metodology: ['', Validators.required],
    //punto16
    resources: ['', Validators.required],
    //falta el punto 17
    criterios: ['', Validators.required],
    //punto 18
    resultFinal: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  addDocumento(doc: DocumentBodyCreate): Observable<DocumentBodyCreate> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const body = doc
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.post<DocumentBodyCreate>(`${baseURL}/doc-curricular`, body, { headers })

  }


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

  validateNecesidadEducativa() {
    return this.docCurricularForm.value.educationalNeed !== ''
  }

  validateResourcesTegnologies() {
    return this.recursosSeleccionados.length > 0
  }

  validateProfessional() {
    return this.profesionalesSeleccionados.length > 0
  }

  validatePunto14() {
    return true
  }

  validateMetodology() {
    return this.docCurricularForm.value.metodology !== ''
  }

  validateResource() {
    return this.docCurricularForm.value.resources !== ''
  }
 
  //validacion del punto 17
  validateCriterios() {
    return this.docCurricularForm.value.criterios !== ''
  }

  validateResultFinal() {
    return this.docCurricularForm.value.resultFinal !== ''
  }

}

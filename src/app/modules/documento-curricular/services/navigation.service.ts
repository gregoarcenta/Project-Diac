import { Injectable } from '@angular/core';
import { ItemPage } from '../interfaces/Items-estudiante.interface';
import { RegisterDocumentCurricularService } from './register-document-curricular.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  items: ItemPage[] = [
    {
      id: 1,
      description: 'DATOS DE IDENTIFICACIÓN DEL ESTUDIANTE',
      link: 'estudiante',
      activated: true,
      passed: false
    },
    {
      id: 2,
      description: 'DATOS DE IDENTIFICACIÓN DEL LA INTITUCION EDUCATIVA',
      link: 'institucion',
      activated: false,
      passed: false
    },
    {
      id: 3,
      description: 'FECHA DE ELABORACION Y DURACION PREVISTA',
      link: 'fecha-elaboracion',
      activated: false,
      passed: false
    },
    {
      id: 4,
      description: 'AREAS/MATERIAS OBJETO DE ADAPTACION CURRICULAR',
      link: 'materias-adaptacion-curricular',
      activated: false,
      passed: false
    },
    {
      id: 5,
      description: 'PROFESIONALES IMPLICADOS EN LA REALIZACION DEL DOCUMENTO DE ADAPTACION CURRICULAR',
      link: 'docentes-imp',
      activated: false,
      passed: false
    },
    {
      id: 6,
      description: 'SINTESIS DE LA INFORMACION CONTENIDA EN EL INFORME PSICOPEDAGOGICO',
      link: 'informe-psicopedagogico',
      activated: false,
      passed: false
    },
    {
      id: 7,
      description: 'DATOS Y ASPECTOS RELEVANTES DE LA HISTORIA PERSONAL DEL ESTUDIANTE',
      link: 'historial-personal',
      activated: false,
      passed: false
    },
    {
      id: 8,
      description: 'DATOS Y ASPECTOS IPORTANTES DEL CONTEXTO EDUCATIVO',
      link: 'informacion-contexto-educativo',
      activated: false,
      passed: false
    },
    {
      id: 9,
      description: 'DATOS Y ASPECTOS IPORTANTES DEL CONTEXTO FAMILIAR',
      link: 'informacion-contexto-familiar',
      activated: false,
      passed: false
    },
    {
      id: 10,
      description: 'DATOS Y ASPECTOS IPORTANTES DEL CONTEXTO SOCIAL',
      link: 'informacion-contexto-social',
      activated: false,
      passed: false
    },
    {
      id: 11,
      description: 'IDENTIFICACION DE LAS NECESIDADES EDUCATIVAS QUE MOTIVEN LA REALIZACION DE LA ADAPTACION CURRICULAR',
      link: 'necesidades-educativas',
      activated: false,
      passed: false
    },
    {
      id: 12,
      description: 'ADAPTACIONES DE ACCESO AL CURRICULUM',
      link: 'recursos-tecnicos',
      activated: false,
      passed: false
    },
    {
      id: 13,
      description: 'INTERVENCION DE PROFESIONALES ESPECIALIZADOS SEAN INTERNOS O EXTERNOS',
      link: 'profesionales-especializados',
      activated: false,
      passed: false
    },
    {
      id: 14,
      description: 'ADAPTACION CURRICULAR',
      link: 'adaptacion-curricular',
      activated: false,
      passed: false
    },
    {
      id: 15,
      description: 'METODOLOGIA',
      link: 'metodologia',
      activated: false,
      passed: false
    },
    {
      id: 16,
      description: 'RECURSOS',
      link: 'recursos',
      activated: false,
      passed: false
    },
    {
      id: 17,
      description: 'CRITERIOS DE EVALUACION',
      link: 'criterios-evaluacion',
      activated: false,
      passed: false
    },
    {
      id: 18,
      description: 'RESULTADOS FINALES',
      link: 'resultados-finales',
      activated: false,
      passed: false
    }
  ]

  constructor(
    private registerDocumentCurricular: RegisterDocumentCurricularService,
    private router: Router
  ) { }

  toggleItemActivated(idItem: number) {
    if (!this.validateNextUrl(idItem)) {
      this.showErrorNextPage(idItem);
    } else {
      let itemsCopy = [...this.items]
      this.items = itemsCopy.map(item => {
        if (item.activated) item.activated = false
        if (item.id === idItem) item.activated = true
        if (item.id - 1 === idItem) item.passed = true
        return item
      })
      this.nextPage(idItem)
    }
  }

  nextPage(id: number) {
    this.items.forEach(rute => {
      if (rute.id === id) {
        this.router.navigateByUrl(`/dashboard/adaptacion-curricular/${rute.link}`)
      }
    })
  }

  validateNextUrl(id: number) {
    switch (id) {
      case 1:
        return true
      case 2:
        return this.registerDocumentCurricular.validateStudent()
      case 3:
        return this.registerDocumentCurricular.validateInstitution()
      case 4:
        return this.registerDocumentCurricular.validateElaborationDate()
      case 5:
        return this.registerDocumentCurricular.validateCoursesSelect()
      case 6:
        return this.registerDocumentCurricular.validateDocentesSelect()
      case 7:
        return this.registerDocumentCurricular.validateInfoPedagogico()
      case 8:
        return this.registerDocumentCurricular.validateInfoHistoryPersonal()
      case 9:
        return this.registerDocumentCurricular.validateContextEducation()
      case 10:
        return this.registerDocumentCurricular.validateContextFamily()
      case 11:
        return this.registerDocumentCurricular.validateContextSocial()
      case 12:
        return this.registerDocumentCurricular.validateNecesidadEducativa()
      case 13:
        return this.registerDocumentCurricular.validateResourcesTegnologies()
      case 14:
        return this.registerDocumentCurricular.validateProfessional()
      case 15:
        return true/* this.registerDocumentCurricular.punto 14 */
      case 16:
        return this.registerDocumentCurricular.validateMetodology()
      case 17:
        return this.registerDocumentCurricular.validateResource()
      case 18:
        return true/* this.registerDocumentCurricular.punto 17() */
      default:
        return null
    }
  }

  showErrorNextPage(id: number) {
    switch (id) {
      case 2:
        Swal.fire('Tiene que seleccionar un estudiante para el registro del documento!', '', 'error')
        break;
      case 3:
        Swal.fire('Tiene que seleccionar una institucion para el registro del documento!', '', 'error')
        break;
      case 4:
        Swal.fire('Tiene que colocar una duración para el registro del documento!', '', 'error')
        break;
      case 5:
        Swal.fire('Tiene que seleccionar al menos 1 asigantura para el registro del documento!', '', 'error')
        break;
      case 6:
        Swal.fire('Tiene que seleccionar al menos 1 docente para el registro del documento!', '', 'error')
        break;
      case 7:
        Swal.fire('La información psicopedagógica no puede quedar vacia!', '', 'error')
        break;
      case 8:
        Swal.fire('Los campos no pueden quedar vacio!', '', 'error')
        break;
      case 9:
        Swal.fire('EL campo no puede quedar vacio!', '', 'error')
        break;
      case 10:
        Swal.fire('El campo no puede quedar vacio!', '', 'error')
        break;
      case 11:
        Swal.fire('El campo no puede quedar vacio!', '', 'error')
        break;
      case 12:
        Swal.fire('El campo no puede quedar vacio!', '', 'error')
        break;
      case 13:
        Swal.fire('Tiene que seleccionar al menos 1 recurso para el registro del documento!', '', 'error')
        break;
      case 14:
        Swal.fire('Tiene que seleccionar al menos 1 profesional para el registro del documento!', '', 'error')
        break;
      case 15:
        Swal.fire('punto 14', '', 'error')
        break;
      case 16:
        Swal.fire('El campo de metodología no puede quedar vacio!', '', 'error')
        break;
      case 17:
        Swal.fire('El campo de recursos no puede quedar vacio!', '', 'error')
        break;
      case 18:
        Swal.fire('punto 17', '', 'error')
        break;
      default:
        break;
    }
  }

}

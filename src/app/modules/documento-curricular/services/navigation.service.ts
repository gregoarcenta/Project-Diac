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
      activated: true
    },
    {
      id: 2,
      description: 'DATOS DE IDENTIFICACIÓN DEL LA INTITUCION EDUCATIVA',
      link: 'institucion',
      activated: false
    },
    {
      id: 3,
      description: 'FECHA DE ELABORACION Y DURACION PREVISTA',
      link: 'fecha-elaboracion',
      activated: false
    },
    {
      id: 4,
      description: 'AREAS/MATERIAS OBJETO DE ADAPTACION CURRICULAR',
      link: 'materias-adaptacion-curricular',
      activated: false
    },
    {
      id: 5,
      description: 'PROFESIONALES IMPLICADOS EN LA REALIZACION DEL DOCUMENTO DE ADAPTACION CURRICULAR',
      link: 'docentes-imp',
      activated: false
    },
    {
      id: 6,
      description: 'SINTESIS DE LA INFORMACION CONTENIDA EN EL INFORME PSICOPEDAGOGICO',
      link: 'informe-psicopedagogico',
      activated: false
    },
    {
      id: 7,
      description: 'DATOS Y ASPECTOS RELEVANTES DE LA HISTORIA PERSONAL DEL ESTUDIANTE',
      link: 'historial-personal',
      activated: false
    },
    {
      id: 8,
      description: 'DATOS Y ASPECTOS IPORTANTES DEL CONTEXTO EDUCATIVO',
      link: 'informacion-contexto-educativo',
      activated: false
    },
    {
      id: 9,
      description: 'DATOS Y ASPECTOS IPORTANTES DEL CONTEXTO FAMILIAR',
      link: 'informacion-contexto-familiar',
      activated: false
    },
    {
      id: 10,
      description: 'DATOS Y ASPECTOS IPORTANTES DEL CONTEXTO SOCIAL',
      link: 'informacion-contexto-social',
      activated: false
    },
    {
      id: 11,
      description: 'IDENTIFICACION DE LAS NECESIDADES EDUCATIVAS QUE MOTIVEN LA REALIZACION DE LA ADAPTACION CURRICULAR',
      link: 'adap-curriculo',
      activated: false
    },
    {
      id: 12,
      description: 'ADAPTACIONES DE ACCESO AL CURRICULUM',
      link: 'adap-curriculo',
      activated: false
    },
    {
      id: 13,
      description: 'INTERVENCION DE PROFESIONALES ESPECIALIZADOS SEAN INTERNOS O EXTERNOS',
      link: 'adap-curriculo',
      activated: false
    },
    {
      id: 14,
      description: 'ADAPTACION CURRICULAR',
      link: 'adaptacion',
      activated: false
    },
    {
      id: 15,
      description: 'METODOLOGIA',
      link: 'metodologia',
      activated: false
    },
    {
      id: 16,
      description: 'RECURSOS',
      link: 'metodologia',
      activated: false
    },
    {
      id: 17,
      description: 'CRITERIOS DE EVALUACION',
      link: 'metodologia',
      activated: false
    },
    {
      id: 18,
      description: 'RESULTADOS FINALES',
      link: 'metodologia',
      activated: false
    },
    {
      id: 19,
      description: 'FIRMAS DE REPONSABILIDAD',
      link: 'metodologia',
      activated: false
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
        return true/* this.registerDocumentCurricular.validateStudent() */
      case 3:
        return true/* this.registerDocumentCurricular.validateInstitution() */
      case 4:
        return true/* this.registerDocumentCurricular.validateElaborationDate() */
      case 5:
        return true/* this.registerDocumentCurricular.validateCoursesSelect() */
      case 6:
        return true/* this.registerDocumentCurricular.validateDocentesSelect() */
      case 7:
        return true/* this.registerDocumentCurricular.validateInfoPedagogico() */
      case 8:
        return true/* this.registerDocumentCurricular.validateInfoHistoryPersonal() */
      case 9:
        return true/* this.registerDocumentCurricular.validateContextEducation() */
      case 10:
        return true/* this.registerDocumentCurricular.validateContextFamily() */
      case 11:
        return true/* this.registerDocumentCurricular.validateContextSocial() */

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
      default:
        break;
    }
  }

}

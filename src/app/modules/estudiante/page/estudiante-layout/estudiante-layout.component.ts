import { Component, OnInit } from '@angular/core';

import { ItemPage } from '../../interfaces/Items-estudiante.interface';


@Component({
  selector: 'app-estudiante-layout',
  templateUrl: './estudiante-layout.component.html',
  styleUrls: ['./estudiante-layout.component.css']
})
export class EstudianteLayoutComponent implements OnInit {

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
      link: 'fecha-elaboracion',
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
      link: 'docentes-imp',
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
      link: 'inf-contexto',
      activated: false
    },
    {
      id: 9,
      description: 'DATOS Y ASPECTOS IPORTANTES DEL CONTEXTO FAMILIAR',
      link: 'inf-contexto',
      activated: false
    },
    {
      id: 10,
      description: 'DATOS Y ASPECTOS IPORTANTES DEL CONTEXTO SOCIAL',
      link: 'inf-contexto',
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

  constructor() { }

  ngOnInit(): void {
  }

  toggleItemActivated(idItem: number) {
    let itemsCopy = [...this.items]
    this.items = itemsCopy.map(item => {
      if (item.activated) item.activated = false
      if (item.id === idItem) item.activated = true
      return item
    })

    //this.router.navigateByUrl('dashboard/estudiante/institucion')

  }

}

import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';
import { Course, Destreza, Criterios } from 'src/app/modules/destreza/interfaces/asignatura.interface';


@Component({
  selector: 'app-criterios-evaluacion',
  templateUrl: './criterios-evaluacion.component.html',
  styleUrls: ['./criterios-evaluacion.component.css']
})
export class CriteriosEvaluacionComponent implements OnInit {

  primerQuimestre: String = '' 
  reajustes: String=''
  segundoQuimestre: String=''

  CriteriosListSelected: Criterios[] = []
  CriteriosSeleccionados: number[] = []

  //Variables para los texts areas
  destrezasActuales: Destreza[] = []
  criteriosActualues: Criterios[] = []

  constructor(
    private navigationService: NavigationService,
    public registerDocumentCurricular: RegisterDocumentCurricularService
  ) {}



  ngOnInit(): void {
    this.primerQuimestre = this.registerDocumentCurricular.docCurricularForm.value.criterios
  }

  openCriterios(asignatura: Course) {
    this.criteriosActualues = asignatura.criterios
  }


  fillResources(e: any, criterio: Criterios) {
    if (e.target.checked) {
      this.CriteriosListSelected.push(criterio)
      this.CriteriosSeleccionados.push(criterio.id)
      console.log(this.CriteriosSeleccionados);
    } else {
      this.CriteriosListSelected = this.CriteriosListSelected.filter(obj => obj.id !== criterio.id)
      this.CriteriosSeleccionados = this.CriteriosSeleccionados.filter(id => id !== criterio.id)
    }
    let resultado = new Set(this.CriteriosListSelected);
    this.CriteriosListSelected = [];
    resultado.forEach(element => {
      this.CriteriosListSelected.push(element)
    });
  }

  
  renameForId(name: string) {
    return '#' + name.replace(/ /g, '')
  }

  renameForIdCollapse(name: string) {
    return name.replace(/ /g, '')
  }

  nextPage() {
    this.navigationService.toggleItemActivated(18);
  }
}
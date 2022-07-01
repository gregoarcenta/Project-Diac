import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';
import { Course, Objective, Destreza } from 'src/app/modules/destreza/interfaces/asignatura.interface';


@Component({
  selector: 'app-criterios-evaluacion',
  templateUrl: './criterios-evaluacion.component.html',
  styleUrls: ['./criterios-evaluacion.component.css']
})
export class CriteriosEvaluacionComponent implements OnInit {

   primerQuimestre: String = '' 
   reajustes: String=''
   segundoQuimestre: String=''

 
 
   //Variables para los texts areas


     //Variables para los texts areas
   ObjetivosActuales: Objective[] = []
   destrezasActuales: Destreza[] = []



  constructor(
    private navigationService: NavigationService,
    public registerDocumentCurricular: RegisterDocumentCurricularService
  ) {}



  ngOnInit(): void {
    this.primerQuimestre = this.registerDocumentCurricular.docCurricularForm.value.criterios
    
  }

  openObjectives(asignatura: Course) {
    this.ObjetivosActuales = asignatura.Objectives
  }


  fillResources() {
    this.registerDocumentCurricular.docCurricularForm.controls['criterios'].setValue(this.primerQuimestre)
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
import { Component, OnInit } from '@angular/core';
import { Institution } from 'src/app/modules/institucion/interfaces/institution.interface';
import { InstitucionService } from 'src/app/modules/institucion/services/institucion.service';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.css']
})
export class InstitucionComponent implements OnInit {

  institucionList: Institution[] = []
  institucionSeleccionada?: Institution

  name: string = ''
  existsInstitution: boolean = true

  constructor(
    private institucionService: InstitucionService,
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.institucionSeleccionada = this.registerDocumentCurricular.institucionSeleccionada
  }

  fillSelectInstitutions() {
    const spinner = document.getElementById('spinner')
    this.institucionList = []
    this.institucionService.getInstitutionsByName(this.name)
      .subscribe(institucion => {
        spinner?.classList.add('d-none')
        this.institucionList = institucion.institutions
        this.existsInstitution = this.institucionList.length > 0
      })
  }

  SelectionInstitutionInfo(institucion: Institution) {
    this.institucionList = []
    this.institucionSeleccionada = institucion
    this.registerDocumentCurricular.docCurricularForm.controls['idInstitution'].setValue(institucion.id)
    this.registerDocumentCurricular.institucionSeleccionada = institucion
    document.getElementById('btnCloseModal')?.click()
  }

  nextPage() {
    this.navigationService.toggleItemActivated(3)
  }


}

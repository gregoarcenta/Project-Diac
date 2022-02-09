import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

@Component({
  selector: 'app-metodologia',
  templateUrl: './metodologia.component.html',
  styleUrls: ['./metodologia.component.css']
})
export class MetodologiaComponent implements OnInit {

  metodologia: string = ''

  constructor(
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.metodologia = this.registerDocumentCurricular.docCurricularForm.value.metodology
  }


  fillMetodologia() {
    this.registerDocumentCurricular.docCurricularForm.controls['metodology'].setValue(this.metodologia)
  }

  nextPage() {
    this.navigationService.toggleItemActivated(16)
  }

}

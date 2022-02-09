import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent implements OnInit {

  recursos: string = ''

  constructor(
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.recursos = this.registerDocumentCurricular.docCurricularForm.value.resources
  }

  fillResources() {
    this.registerDocumentCurricular.docCurricularForm.controls['resources'].setValue(this.recursos)
  }

  nextPage() {
    this.navigationService.toggleItemActivated(17)
  }

}

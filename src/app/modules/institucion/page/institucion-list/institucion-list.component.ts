import { Component, OnInit } from '@angular/core';
import { Institution } from '../../interfaces/institution.interface';
import { InstitucionService } from '../../services/institucion.service';

@Component({
  selector: 'app-institucion-list',
  templateUrl: './institucion-list.component.html',
  styleUrls: ['./institucion-list.component.css']
})
export class InstitucionListComponent implements OnInit {

  institucionList: Institution[] = []

  constructor(private institucionService: InstitucionService) { }

  ngOnInit(): void {
    this.institucionService.getInstitutions()
      .subscribe(instituciones => this.institucionList = instituciones.institutions)
  }

  showMenu() {
    const listMenu = document.querySelector('.list-group-plus')
    listMenu?.classList.toggle('show')
  }

}

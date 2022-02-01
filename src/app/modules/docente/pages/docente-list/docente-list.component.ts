import { Component, OnInit } from '@angular/core';
import { DocenteList, Teacher } from '../../interfaces/docente.interface';
import { DocenteService } from '../../services/docente.service';

@Component({
  selector: 'app-docente-list',
  templateUrl: './docente-list.component.html',
  styleUrls: ['./docente-list.component.css']
})
export class DocenteListComponent implements OnInit {
  docenteList: Teacher[] = []

//------paginacion----
  pageActual:number=1;
  
  constructor(private docenteService: DocenteService) { }

// -------filtro de pipe 
filterDocente = '';

  ngOnInit(): void {
    this.docenteService.getDocentes()
      .subscribe(docentes => this.docenteList = docentes.teachers)
  }

  showMenu() {
    const listMenu = document.querySelector('.list-group-plus')
    listMenu?.classList.toggle('show')
  }


}

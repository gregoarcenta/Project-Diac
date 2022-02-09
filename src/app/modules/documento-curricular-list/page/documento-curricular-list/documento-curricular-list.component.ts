import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudiante-list',
  templateUrl: './documento-curricular-list.component.html',
  styleUrls: ['./documento-curricular-list.component.css']
})
export class DocumentoCurricularListComponent implements OnInit {

//------paginacion----
pageActual: number = 1;

  // -------filtro de pipe
  filterItems = '';

items: any = [
  { id:"1", nombre:"Alex ", apellidos:"franco", tutor:"patricia Reyes", curso:"noveno" },
  { id:"2", nombre:"Neivis ", apellidos:"franco", tutor:"patricia Reyes", curso:"noveno" },
  { id:"3", nombre:"Bryan ", apellidos:"franco", tutor:"patricia Reyes", curso:"noveno" },
  { id:"4", nombre:"Adrian ", apellidos:"franco", tutor:"patricia Reyes", curso:"noveno" },
  { id:"5", nombre:"neivis ", apellidos:"franco", tutor:"patricia Reyes", curso:"noveno" },
  { id:"6", nombre:"neivis ", apellidos:"franco", tutor:"patricia Reyes", curso:"noveno" },
  { id:"7", nombre:"neivis ", apellidos:"franco", tutor:"patricia Reyes", curso:"noveno" },
  { id:"8", nombre:"neivis ", apellidos:"franco", tutor:"patricia Reyes", curso:"noveno" }
]

  constructor() { }

  ngOnInit(): void {
  }

}

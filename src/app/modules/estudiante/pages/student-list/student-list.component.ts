import { Component, OnInit } from '@angular/core';
import { RegistroStudent } from '../../interfaces/registro-student.interface';
import { EstudianteService } from '../../service/estudiante.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  estudianteList: RegistroStudent[] = []
  //----paginacion
  pageActual: number = 1;

  constructor(private estudianteService: EstudianteService) { }

  // -------filtro de pipe
  filterEstudiante = '';



  ngOnInit(): void {
    this.estudianteService.getStudent()
      .subscribe(estudiantes => this.estudianteList = estudiantes.students)
  }

  showMenu() {
    const listMenu = document.querySelector('.list-group-plus')
    listMenu?.classList.toggle('show')
  }

}

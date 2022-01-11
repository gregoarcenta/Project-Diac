import { Component, OnInit } from '@angular/core';
import { RegistroStudent } from '../../interfaces/registro-student.interface';
import { RegistroStudentService } from '../../service/registro-student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  estudianteList: RegistroStudent[] =[]

  constructor(private registroStudenService: RegistroStudentService) { }

  ngOnInit(): void {
    this.registroStudenService.getStudent()
    .subscribe(estudiantes => this.estudianteList = estudiantes.students)
  }

  showMenu(){
    const listMenu = document.querySelector('.list-group-plus')
    listMenu?.classList.toggle('show')
  }

}

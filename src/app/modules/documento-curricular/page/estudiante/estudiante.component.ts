import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroStudent } from 'src/app/modules/estudiante/interfaces/registro-student.interface';
import { EstudianteService } from 'src/app/modules/estudiante/service/estudiante.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  estudianteList: RegistroStudent[] = []
  estudianteSeleccionado?: RegistroStudent

  name: string = ''
  lastName: string = ''
  existsSudent: boolean = true

  constructor(
    private estudianteService: EstudianteService,
    private navigationService: NavigationService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  fillSelectStudents() {
    const spinner = document.getElementById('spinner')
    this.estudianteList = []
    this.estudianteService.getStudentByNameOrLastName(this.name, this.lastName)
      .subscribe(estudiantes => {
        spinner?.classList.add('d-none')
        this.estudianteList = estudiantes.students
        this.existsSudent = this.estudianteList.length > 0
      })
  }

  SelectionStudentInfo(estudiante: RegistroStudent) {
    this.estudianteList = []
    this.estudianteSeleccionado = estudiante
    document.getElementById('btnCloseModal')?.click()
  }

  nextPage() {
    this.navigationService.toggleItemActivated(2)
    this.router.navigateByUrl("/dashboard/adaptacion-curricular/institucion")
  }

}



import { Component, OnInit } from '@angular/core';

import { ItemPage } from '../../interfaces/Items-estudiante.interface';
import { NavigationService } from '../../services/navigation.service';


@Component({
  selector: 'app-estudiante-layout',
  templateUrl: './estudiante-layout.component.html',
  styleUrls: ['./estudiante-layout.component.css']
})
export class EstudianteLayoutComponent implements OnInit {



  constructor(public navigationService: NavigationService) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/login/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user = 'assets/imagenes/user.png';

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  get getAuthUser() {
    return this.authService.getAuthUser.user
  }

}

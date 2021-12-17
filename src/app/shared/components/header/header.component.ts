import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/login/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarEvent = new EventEmitter<string>()

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  get getAuthUser() {
    return this.authService.getAuthUser.user
  }

  toggleSidebar() {
    this.toggleSidebarEvent.emit('')
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('/login')
  }

}

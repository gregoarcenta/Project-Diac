import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logo = 'assets/imagenes/studiante.jpg';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  ingresar() {
    this.authService.login().subscribe({
      next: (resp) => console.log(resp),
      error: (err) => console.log(err),
      complete: () => this.router.navigateByUrl('/dashboard')
    })

  }

}

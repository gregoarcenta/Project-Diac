import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUser } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageError: string = ''
  typeAlert: string = ''
  alertActive: boolean = false

  logo = 'assets/imagenes/studiante.jpg';

  loginForm: FormGroup = this.formBuilder.group({
    usuario: ['', Validators.required],
    contraseña: ['', Validators.required]
  })

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  showAlert(value: boolean) {
    this.alertActive = value
  }


  validCampo(campo: string) {
    if (this.loginForm.controls[campo].errors && this.loginForm.controls[campo].touched) {
      return { messagge: `El campo ${campo} es obligatorio`, valid: false }
    } else {
      return { messagge: null, valid: true }
    }
  }

  ingresar() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return
    }
    const data: any = {
      username: this.loginForm.value.usuario,
      password: this.loginForm.value.contraseña
    }
    this.authService.login(data).subscribe({
      next: (resp) => {
        this.messageError = 'Sesión iniciada'
        this.typeAlert = 'success'
        this.alertActive = true
        this.loginForm.reset()
        console.log(resp)
      },
      error: (err) => {
        this.messageError = 'Usuario o contraseña incorrectos'
        this.typeAlert = 'danger'
        this.alertActive = true
        console.log(err)
      },
      complete: () => this.router.navigateByUrl('/dashboard')
    })

  }

}

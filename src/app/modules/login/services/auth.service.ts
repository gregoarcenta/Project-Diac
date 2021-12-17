import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap, } from 'rxjs';
import { AuthUser } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  data: any = {
    email: "gregoarcenta@gmail.com",
    password: "12345"
  }

  authUser: AuthUser | undefined

  constructor(private http: HttpClient) { }

  get getAuthUser(): AuthUser {
    return { ...this.authUser! }
  }

  isAuthenticated(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false)
    }
    return of(true)
  }

  login(): Observable<AuthUser> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.post<AuthUser>(
      'https://project-diac-uleam.herokuapp.com/login',
      this.data,
      { headers }
    ).pipe(
      tap(auth => this.authUser = auth),
      tap(auth => localStorage.setItem('token', auth.jwt)
      )
    )
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, } from 'rxjs';
import { AuthUser } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUser: AuthUser | undefined

  constructor(private http: HttpClient) { }

  get getAuthUser(): AuthUser {
    return { ...this.authUser! }
  }

  isAuthenticate(): Observable<boolean> {
    const token: string = localStorage.getItem('token') || ''
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.get<AuthUser>('https://project-diac-uleam.herokuapp.com/login/renew',
      { headers }).pipe(
        map(resp => {
          localStorage.setItem('token', resp.jwt)
          this.authUser = resp
          return true
        }),
        catchError(err => of(false))
      )
  }

  login(data: any): Observable<AuthUser> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')

    const body = data
    return this.http.post<AuthUser>(
      'https://project-diac-uleam.herokuapp.com/login',
      body,
      { headers }
    ).pipe(
      tap(auth => this.authUser = auth),
      tap(auth => localStorage.setItem('token', auth.jwt))
    )
  }

  logout() {
    localStorage.removeItem('token')
  }

}

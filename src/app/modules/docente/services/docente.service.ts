import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocenteList, TeacherBodyCreate } from '../interfaces/docente.interface';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(private http: HttpClient) { }

  getDocentes(): Observable<DocenteList> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.get<DocenteList>(`${baseURL}/teacher`, { headers })
  }

  addDocente(docente: TeacherBodyCreate): Observable<TeacherBodyCreate> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const body = docente
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.post<TeacherBodyCreate>(`${baseURL}/teacher`, body, { headers })
  }

}

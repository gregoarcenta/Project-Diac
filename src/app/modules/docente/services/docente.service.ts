import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocenteList, TeacherBodyCreate, TeacherResponseAfterCreate } from '../interfaces/docente.interface';
import { UserBodyCreate } from '../interfaces/user.interface';

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

  getDocentesByCourse(arrayCourses: CoursesList): Observable<DocenteList> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const body = arrayCourses
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.post<DocenteList>(`${baseURL}/teacher/filter/courses`, body, { headers })
  }

  addDocente(docente: TeacherBodyCreate): Observable<TeacherResponseAfterCreate> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const body = docente
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.post<TeacherResponseAfterCreate>(`${baseURL}/teacher`, body, { headers })
  }

  addUser(user: UserBodyCreate): Observable<UserBodyCreate> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const body = user
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.post<UserBodyCreate>(`${baseURL}/user`, body, { headers })
  }

  updateDocente(id: number, docente: TeacherBodyCreate): Observable<TeacherResponseAfterCreate> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const body = docente
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.put<TeacherResponseAfterCreate>(`${baseURL}/teacher/${id}`, body, { headers })
  }

  eliminarDocente(id: number): Observable<DocenteList>{
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.delete<DocenteList>(`${baseURL}/teacher/${id}`, { headers })
  }

}

export interface CoursesList {
  courses: number[];
}


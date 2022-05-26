import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstudianteList, StudentBodyCreate, RegistroStudent } from '../interfaces/registro-student.interface';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient) { }

  getStudent(): Observable<EstudianteList> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.get<EstudianteList>(`${baseURL}/student`, { headers })
  }

  getStudentByNameOrLastName(name: string, lastName: string): Observable<EstudianteList> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.get<EstudianteList>(`${baseURL}/student/filter?nombre=${name}&apellido=${lastName}`, { headers })
  }

  addEstudiante(estudiante: StudentBodyCreate): Observable<StudentBodyCreate> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const body = estudiante
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.post<StudentBodyCreate>(`${baseURL}/student`, body, { headers })

  }

  updateEstudiante(id: number, estudiante: StudentBodyCreate): Observable<StudentBodyCreate> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const body = estudiante
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.put<StudentBodyCreate>(`${baseURL}/student/${id}`, body, { headers })

  }

  eliminarEstudiante(id: number): Observable<RegistroStudent> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.delete<RegistroStudent>(`${baseURL}/student/${id}`, { headers })
  }


}

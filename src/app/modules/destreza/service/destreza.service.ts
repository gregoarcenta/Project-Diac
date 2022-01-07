import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Asignatura, Objective as obj, DestrezaElement } from '../interfaces/destreza.interface';
import { AsignaturaList, Destreza, Objective } from '../interfaces/asignatura.interface';

@Injectable({
  providedIn: 'root'
})
export class DestrezaService {

  constructor(private http: HttpClient) { }

  addAsignatura(asignatura: Asignatura): Observable<Asignatura> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const body = asignatura
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.post<Asignatura>(`${baseURL}/course`, body, { headers })
  }

  allAsignaturas(): Observable<AsignaturaList> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.get<AsignaturaList>(`${baseURL}/course`, { headers })
  }

  updateObjective(id: number, objective: obj): Observable<Objective> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const body = objective
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.put<Objective>(`${baseURL}/course/objective/${id}`, body, { headers })
  }

  updateDestreza(id: number, destreza: DestrezaElement): Observable<Destreza> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const body = destreza
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.put<Destreza>(`${baseURL}/course/destreza/${id}`, body, { headers })
  }

  addDestreza(id: number, destrezas: DestrezaElement[]): Observable<Destreza> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const body = { destrezas }
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.post<Destreza>(`${baseURL}/course/${id}/destreza`, body, { headers })
  }

  addObjective(id: number, objectives: obj[]): Observable<Objective> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const body = { objectives }
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.post<Objective>(`${baseURL}/course/${id}/objective`, body, { headers })
  }

  deleteObjective(id: number): Observable<Objective> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.delete<Objective>(`${baseURL}/course/objective/${id}`, { headers })
  }

  deleteDestreza(id: number): Observable<Destreza> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.delete<Destreza>(`${baseURL}/course/destreza/${id}`, { headers })
  }
}

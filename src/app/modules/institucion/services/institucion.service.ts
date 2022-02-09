import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Institution, InstitutionBodyCreate, InstitutionList } from '../interfaces/institution.interface';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {

  constructor(private http: HttpClient) { }

  getInstitutions(): Observable<InstitutionList> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.get<InstitutionList>(`${baseURL}/institution`, { headers })
  }

  getInstitutionsByName(name: string): Observable<InstitutionList> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.get<InstitutionList>(`${baseURL}/institution/filter?nombre=${name}`, { headers })
  }

  addInstitution(institucion: InstitutionBodyCreate): Observable<Institution> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const body = institucion
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.post<Institution>(`${baseURL}/institution`, body, { headers })
  }

  updateInstitution(id: number, institucion: InstitutionBodyCreate): Observable<Institution> {
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const body = institucion
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.put<Institution>(`${baseURL}/institution/${id}`, body, { headers })
  }

  eliminarInstitucion(id: number): Observable<Institution>{
    const token: string = localStorage.getItem('token') || ''
    const baseURL = environment.baseURL
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `bearer ${token}`)

    return this.http.delete<Institution>(`${baseURL}/institution/${id}`, { headers })
  }

}

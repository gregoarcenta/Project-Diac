import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doc, Documents } from '../interfaces/documento.interface';
@Injectable({
  providedIn: 'root'
})
export class DocumentoCurricularListService {

  constructor(private http: HttpClient) { }

getDocumento(): Observable<Documents> {
  const token: string = localStorage.getItem('token') || ''
  const baseURL = environment.baseURL
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('authorization', `bearer ${token}`)

    return this.http.get<Documents>(`${baseURL}/doc-curricular`, { headers })
}

visualizarDoc(id: number): Observable<Doc>{
  const token: string = localStorage.getItem('token') || ''
  const baseURL = environment.baseURL
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('authorization', `bearer ${token}`)

  return this.http.get<Doc>(`${baseURL}/doc-curricular/${id}`, { headers })
}




}

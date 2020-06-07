import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curtida } from 'src/app/model/curtida/curtida';
import { Post } from 'src/app/model/post/post';

@Injectable({
  providedIn: 'root'
})
export class CurtidaService {

  constructor(private http: HttpClient) { }

  createCurtida(curtida: Curtida): Observable<any>{
    const url = "https://server-d.herokuapp.com/curtida/createCurtida";
    return this.http.post<any>(url, curtida);
  }

  readCurtidas(): Observable<any[]>{
    const url = "https://server-d.herokuapp.com/curtida/getAllCurtida";
    return this.http.get<any[]>(url);
  }

  readCurtidasById(id: string): Observable<any>{
    const url = "https://server-d.herokuapp.com/curtida/getCurtidaId/";
    return this.http.get<any>(url + id);
  }

  deleteCurtida(idUsuario: number, idPost: number): Observable<any>{
    const url = "https://server-d.herokuapp.com/curtida/removeCurtida/";
    return this.http.delete<any>(url + idUsuario + "/" + idPost);
  }

  verificarCurtida(idUsuario: number, idPost: number): Observable<any>{
    const url = "https://server-d.herokuapp.com/curtida/verificaCurtida/";
    return this.http.get<any>(url + idUsuario + "/" + idPost);
  }
}

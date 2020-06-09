import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artigo } from 'src/app/model/post/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtigoService {

  createArtigo = "https://server-d.herokuapp.com/artigo/criaArtigo/";
  readAllArtigoByEmail = "https://server-d.herokuapp.com/artigo/listaPorEmail/";
  readByIdArtigo = "https://server-d.herokuapp.com/artigo/procuraArtigoPorId/";
  updateArtigo = "https://server-d.herokuapp.com/artigo/atualizaArtigo";
  deleteArtigo = "https://server-d.herokuapp.com/artigo/deletaArtigo/";

  constructor(private http: HttpClient) { }

  criaArtigo(artigo: Artigo): Observable<any>{
    return this.http.post<any>(this.createArtigo, artigo);
  }

  buscaArtigoPorEmail(email: string): Observable<any[]>{
    return this.http.get<any[]>(this.readAllArtigoByEmail + email);
  }

  buscaArtigoPorId(id:number): Observable<any>{
    return this.http.get<any>(this.readByIdArtigo + id);
  }

  atualizaArtigo(artigo: Artigo): Observable<any>{
    return this.http.put<any>(this.updateArtigo, artigo);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from 'src/app/model/pessoa/pessoa';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  url = "https://server-d.herokuapp.com/cientista";
  cadastro = "https://server-d.herokuapp.com/cientista/cadastro";
  verificaLogin = "https://server-d.herokuapp.com/cientista/emailpessoa/";
  listaPessoas = "https://server-d.herokuapp.com/cientista/listaTodos";
  listaPessoasExceto = "https://server-d.herokuapp.com/cientista/listaExceto/";
  atualizaPessoa = "https://server-d.herokuapp.com/cientista/atualizaCientista";

  seguindo = "https://server-d.herokuapp.com/cientista/seguindo/";
  seguidores = "https://server-d.herokuapp.com/cientista/seguidores/";
  follow = "https://server-d.herokuapp.com/cientista/follow/";
  unfollow = "https://server-d.herokuapp.com/cientista/unfollow/"
  verificaFollow = "https://server-d.herokuapp.com/cientista/verificaFollow/"

  notificacao = "https://server-d.herokuapp.com/cientista/notificacao/";

  constructor(private http: HttpClient) { }

  login(pessoa: Pessoa): Observable<any>{
    return this.http.post<any>(this.url  + "/login", pessoa)
    .pipe(map(data =>{
      if (data != null){
        localStorage.setItem("email", pessoa.email);
        return true;
      }
      return false;
    }))
  }

  getNotificacao(email: string): Observable<any[]>{
    return this.http.get<any[]>(this.notificacao + email);
  }

  getPessoaByEmail(email: string): Observable<any>{
    return this.http.get<any>(this.url + "/procuraPorEmail/" + email);
  }

  setPessoa(pessoa: Pessoa): Observable<any>{
    return this.http.post<any>(this.cadastro, pessoa);
  }

  getListaPessoas():Observable<any[]>{
    return this.http.get<any[]>(this.listaPessoas);
  }

  getListaPessoasExceto(email: string): Observable<any>{
    return this.http.get<any[]>(this.listaPessoasExceto + email);
  }

  updatePessoa(pessoa: Pessoa): Observable<any>{
    return this.http.put<any>(this.atualizaPessoa, pessoa);
  }

  getSeguindo(id: number): Observable<any[]>{
    return this.http.get<any[]>(this.seguindo + id);
  }

  getSeguidores(id: number): Observable<any[]>{
    return this.http.get<any[]>(this.seguidores + id);
  }

  setFollow(idSeguindo: number, pessoa: Pessoa): Observable<any>{
    return this.http.get<any>(this.follow + pessoa.id + "/" + idSeguindo);
  }

  undoFollow(idSeguindo: number, pessoa: Pessoa): Observable<any>{
    return this.http.get<any>(this.unfollow + pessoa.id + "/" + idSeguindo);
  }

  verificarFollow(id: number, idASeguir: number): Observable<any>{
    return this.http.get<any>(this.verificaFollow + id + "/" + idASeguir);
  }
}

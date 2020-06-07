import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/post/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  criarPost = "https://server-d.herokuapp.com/post/criar";
  listaPostPorEmail = "https://server-d.herokuapp.com/post/listaPorEmailAutor/";
  listarTodosPosts = "https://server-d.herokuapp.com/post/listaTodos"

  buscaPostPorId = "https://server-d.herokuapp.com/post/listaPorId/";
  editarPost = "https://server-d.herokuapp.com/post/editarPost/";
  deletarPost = "https://server-d.herokuapp.com/post/deletaPost/";

  constructor(private http: HttpClient) { }

  getPostById(idPost: number): Observable<any>{
    return this.http.get<any>(this.buscaPostPorId + idPost);
  }

  getAllPosts(): Observable<any[]>{
    return this.http.get<any[]>(this.listarTodosPosts);
  }

  setPost(post: Post): Observable<any>{
    return this.http.post(this.criarPost, post);
  }

  getPosts(email: string): Observable<any[]>{
    return this.http.get<any[]>(this.listaPostPorEmail + email);
  }

  removerPost(post: Post): Observable<any>{
    return this.http.delete<any>(this.deletarPost + post.id);
  }

  atualizarPost(post: Post): Observable<any>{
    return this.http.put<any>(this.editarPost, post);
  }
}

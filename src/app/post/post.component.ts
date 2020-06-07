import { Component, OnInit } from '@angular/core';
import { Post, Conteudo } from '../model/post/post';
import { PostService } from '../service/post/post.service';
import { PessoaService } from '../service/pessoa/pessoa.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  listaPosts = [];

  temPost: boolean = true;

  post: Post = new Post();
  conteudo: Conteudo = new Conteudo();

  auxConteudo: Conteudo = new Conteudo();
  auxPost: Post = new Post();

  constructor(private postService: PostService, private pessoaService: PessoaService) { 
    this.postService.getPosts(localStorage.getItem("email")).subscribe(
      data => {
        this.listaPosts = data;
        if(data.length == 0){
          this.temPost = false;
        } else {
          this.temPost = true;
        }
      }
    );
  }

  ngOnInit() {
  }

  onSubmit(){
    if (this.conteudo.titulo != null &&
      this.conteudo.conteudo != null &&
      this.conteudo.localDaPublicacao != null &&
      this.conteudo.anoDaPublicacao != null) {
        this.post.curtidas = 0;
        this.post.emailAutor = localStorage.getItem("email");
        this.post.conteudo = this.conteudo;
        this.postService.setPost(this.post).subscribe(
          data => {
            this.listaPosts.push(data);
            if(data.length == 0){
              this.temPost = false;
            } else {
              this.temPost = true;
            }
          }
        );
    }
  }

  getPost(post: Post){
    this.postService.getPostById(post.id).subscribe(
      data => {
        this.auxConteudo = data.conteudo;
        this.auxPost = data;
      }
    );
  }

  editar(){
    this.auxPost.conteudo = this.auxConteudo
    this.postService.atualizarPost(this.auxPost).subscribe(
      data => {
        this.postService.getPosts(localStorage.getItem("email")).subscribe(
          x => {
            this.listaPosts = x;
            if(data.length == 0){
              this.temPost = false;
            } else {
              this.temPost = true;
            }
          }
        );
      }
    );
  }

  excluir(){
    this.postService.removerPost(this.auxPost).subscribe(
      data => {
        if(data){
          this.postService.getPosts(localStorage.getItem("email")).subscribe(
            x => {
              this.listaPosts = x;
              if(data.length == 0){
                this.temPost = false;
              } else {
                this.temPost = true;
              }
            }
          );
        }
      }
    );
  }

}
import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post/post.service';

@Component({
  selector: 'app-lista-post',
  templateUrl: './lista-post.component.html',
  styleUrls: ['./lista-post.component.css']
})
export class ListaPostComponent implements OnInit {

  listaPostPessoa: any;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getListaPost();
  }

  getListaPost(){
    this.postService.getPosts(localStorage.getItem("emailPerfil")).subscribe(
      data => {
        this.listaPostPessoa = data.sort(function (a, b) {	
          return (a.curtidas < b.curtidas) ? 1 : ((b.curtidas < a.curtidas) ? -1 : 0);
        }).slice(0,10);;
      }
    );
  }

}

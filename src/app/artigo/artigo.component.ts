import { Component, OnInit } from '@angular/core';
import { Conteudo, Artigo } from '../model/post/post';
import { ArtigoService } from '../service/artigo/artigo.service';

@Component({
  selector: 'app-artigo',
  templateUrl: './artigo.component.html',
  styleUrls: ['./artigo.component.css']
})
export class ArtigoComponent implements OnInit {

  conteudo: Conteudo = new Conteudo();
  auxConteudo: Conteudo = new Conteudo();

  artigo: Artigo = new Artigo();
  auxArtigo: Artigo = new Artigo();

  listaArtigo = [];

  constructor(private artigoService: ArtigoService) { }

  ngOnInit() {
    this.getArtigos();
  }

  onSubmit(){
    if(this.conteudo.anoDaPublicacao != "" && this.conteudo.conteudo != ""
    && this.conteudo.localDaPublicacao != "" && this.conteudo.titulo != ""){
      this.artigo.conteudo = this.conteudo;
      this.artigo.emailAutor = localStorage.getItem("email");
      this.artigoService.criaArtigo(this.artigo).subscribe(
        data => {
          this.conteudo.anoDaPublicacao = "";
          this.conteudo.conteudo = "";
          this.conteudo.localDaPublicacao = "";
          this.conteudo.tags = "";
          this.conteudo.titulo = "";
          this.conteudo.url = "";
          this.getArtigos();
        }
      );      
    }    
  }

  getArtigos(){
    this.artigoService.buscaArtigoPorEmail(localStorage.getItem("email")).subscribe(
      data => {
        this.listaArtigo = data;
      }
    )
  }

  getArtigo(artigo: Artigo){
    this.artigoService.buscaArtigoPorId(artigo.id).subscribe(
      data => {
        console.log(data);
        this.artigo = data;
        this.auxConteudo = data.conteudo;
      }
    )
  }

  editar(){
    if(this.auxConteudo.anoDaPublicacao != "" && this.auxConteudo.conteudo != ""
    && this.auxConteudo.localDaPublicacao != "" && this.auxConteudo.titulo != ""){ 

      this.artigo.conteudo = this.auxConteudo;
      this.artigoService.atualizaArtigo(this.artigo).subscribe(
        data =>{
          this.getArtigos();
        }
      );
    }  
  }

  excluir(){
    this.artigoService.removeArtigo(this.artigo).subscribe(
      data => {
        console.log(data)
        this.getArtigos();
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Conteudo, Artigo, Arquivo } from '../model/post/post';
import { ArtigoService } from '../service/artigo/artigo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-artigo',
  templateUrl: './artigo.component.html',
  styleUrls: ['./artigo.component.css']
})
export class ArtigoComponent implements OnInit {

  conteudo: Conteudo = new Conteudo();
  tags: Conteudo = new Conteudo();
  auxConteudo: Conteudo = new Conteudo();

  arquivo: Arquivo = new Arquivo();
  auxArquivo: Arquivo = new Arquivo();

  artigo: Artigo = new Artigo();
  auxArtigo: Artigo = new Artigo();

  listaArtigo = [];
  listaTags = [];

  public selectedFile;
  public auxSelectedFile;

  public event1;
  imgURL: any;

  constructor(private artigoService: ArtigoService, private httpClient: HttpClient) {}

  ngOnInit() {
    this.getArtigos();
  }

  public onFileChanged(event){
    this.selectedFile = event.target.files[0];   
  }

  onSubmit(){
    if(this.conteudo.anoDaPublicacao != "" && this.conteudo.conteudo != ""
    && this.conteudo.localDaPublicacao != "" && this.conteudo.titulo != ""
    && this.conteudo.resumo != ""){
      this.artigo.conteudo = this.conteudo;
      this.artigo.curtidas = 0
      this.artigo.emailAutor = localStorage.getItem("email");
      this.artigo.membrosCurtiram = [];

      this.arquivo.docName = "";
      this.arquivo.file = [];
      this.arquivo.type = "";
      this.artigo.arquivo = this.arquivo;

      this.artigoService.criaArtigo(this.artigo).subscribe(
        data => {
          if(this.selectedFile != null){
            let uploadData = new FormData();
            
            uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
            this.artigoService.criaArquivo(data.id, uploadData).subscribe();
          }          

          this.conteudo.anoDaPublicacao = "";
          this.conteudo.conteudo = "";
          this.conteudo.localDaPublicacao = "";
          this.conteudo.tags = "";
          this.conteudo.titulo = "";
          this.conteudo.resumo = "";
          this.conteudo.url = "";
          this.selectedFile = "";
          this.getArtigos();
        }
      );
    }    
  }

  getArtigos(){
    this.artigoService.buscaArtigoPorEmail(localStorage.getItem("email")).subscribe(
      data => {
        this.listaArtigo = data;        
        for (let i = 0; i < this.listaArtigo.length; i++) {
          this.listaTags = this.listaArtigo[i].conteudo.tags.split(",");  
        }
        
      }
    )
  }



  getArtigo(artigo: Artigo){
    this.artigoService.buscaArtigoPorId(artigo.id).subscribe(
      data => {
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
        this.getArtigos();
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Pessoa, Curriculo, Formacao, InfoAdicionais, Trabalho, Informacao } from '../model/pessoa/pessoa';
import { PessoaService } from '../service/pessoa/pessoa.service';
import { PostService } from '../service/post/post.service';
import { CurtidaService } from '../service/curtida/curtida.service';
import { Curtida } from '../model/curtida/curtida';
import { Post } from '../model/post/post';
import { PostPessoa } from '../model/post_pessoa/post_pessoa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();

  curriculo: Curriculo = new Curriculo();
  formacao: Formacao = new Formacao();
  infoAdicionais: InfoAdicionais = new InfoAdicionais();
  informacao: Informacao = new Informacao();
  trabalho: Trabalho = new Trabalho();

  temInteresses: boolean;
  interesses = [];
  
  cientista: boolean;
  dataNascimento: string;
  tempoEmAtividade: string;

  listaPosts = [];
  temPost: boolean;

  curtida: Curtida = new Curtida();
  jaCurtiu = false;
  
  status = ["Curtir", "Descurtir"]
  listaPostPessoa = [];
  auxPost = new Post();

  seguir = false;
  seguindo = [];
  seguidores = [];

  constructor(private pessoaService: PessoaService, private postService: PostService, 
    private curtidaService: CurtidaService, private router: Router) {
  }

  ngOnInit() {
    this.getPessoa();  
    this.like();
  }


  botaoDeCurtir(post: PostPessoa){
    if (post.status === "Curtir") {
      this.postService.getPostById(post.idDoPost).subscribe(
        data => {
          this.auxPost = data;
          this.auxPost.curtidas++;
          this.curtida.idPostCurtido = post.idDoPost;
          this.curtida.idUsuarioCurtiu = +(localStorage.getItem("idUsuario"));
          this.postService.atualizarPost(this.auxPost).subscribe();
          this.curtidaService.createCurtida(this.curtida).subscribe();  
          this.ngOnInit();   
        }
      )
    } else if (post.status === "Descurtir") {
      this.postService.getPostById(post.idDoPost).subscribe(
        data => {
          this.auxPost = data;
          this.auxPost.curtidas--;
          this.curtida.idPostCurtido = post.idDoPost;
          this.curtida.idUsuarioCurtiu = +(localStorage.getItem("idUsuario"));
          this.postService.atualizarPost(this.auxPost).subscribe();
          this.curtidaService.deleteCurtida(+(localStorage.getItem("idUsuario")),this.auxPost.id).subscribe();
          this.ngOnInit(); 
        }
      )
    }
  }

  like(){
    this.postService.getPosts(localStorage.getItem("emailPerfil")).subscribe(
      data => {  
        if (this.listaPostPessoa.length > 0) {
          this.listaPostPessoa.splice(0, data.length);
        }      
        
        for (var i = 0; i < data.length; i++) {
          let postPessoa = new PostPessoa();
          postPessoa.idDoPost = data[i].id;
          postPessoa.conteudo = data[i].conteudo;
          postPessoa.emailAutor = data[i].emailAutor;
          postPessoa.curtidas = data[i].curtidas;
          this.curtidaService.verificarCurtida(+(localStorage.getItem("idUsuario")),  postPessoa.idDoPost)
          .subscribe(
            x => {
              if(x) {
                postPessoa.status = this.status[0];
              } else {
                postPessoa.status = this.status[1];
              }
            }
          );          
          this.listaPostPessoa.push(postPessoa);
        }
        this.temPost = this.verificarPost(); 
      }            
    );
  }
  
  getPessoa() {
    this.pessoaService.getPessoaByEmail(localStorage.getItem("emailPerfil")).subscribe(
      data => {
        this.pessoa = data;
        
        this.curriculo = data.curriculo;

        this.formacao = data.formacao;

        this.infoAdicionais = data.infoAdicionais;

        this.informacao = data.informacao;

        this.trabalho = data.trabalho;
        
        let str = data.infoAdicionais.dataNascimento;
        let array = str.split("-");
        let final = array[2] + "/" + array[1] + "/" + array[0];
        this.dataNascimento = final.toString();

        let dataInicioCientista = data.infoAdicionais.dataInicioCientista;
        const now = new Date();
        const past = new Date(dataInicioCientista);
        const dif = Math.abs(now.getTime() - past.getTime());
        const days = Math.floor(dif / (1000 * 60 * 60 * 24));

        if (days < 365) {
          let final2 = Math.floor(days / 30);
          this.tempoEmAtividade = final2.toString() + " mes(es)";
        } else {
          let final2 = Math.floor(days / 365);
          this.tempoEmAtividade = final2.toString() + " ano(s)";
        }

        if (data.interesses == "" || data.interesses == null) {
          this.temInteresses = false;
        } else {
          this.temInteresses = true;
          this.interesses = this.pessoa.interesses.split(",");
        }     

        this.getSeguindo(data.id);
        this.getSeguidores(data.id);
        this.verificarFollow(data.id); 

        this.cientista = this.verificarPessoa();           
      }
    );    
  }

  goToPerfil(email: string){
    localStorage.setItem("emailPerfil", email);
    this.router.navigateByUrl("perfil");
  }

  getSeguindo(a: any){
    this.pessoaService.getSeguindo(a).subscribe( 
      data => {
        this.seguindo = data;
      }      
    )
  }

  getSeguidores(a: any){
    this.pessoaService.getSeguidores(a).subscribe( 
      data => {
        this.seguidores = data;   
      }      
    )
  }

  verificarPost(){
    if(this.listaPostPessoa.length == 0){
      return false;
    } else {
      return true;
    }
  }

  verificarPessoa() {
    if (this.trabalho != null) {
      return true;
    } else {
      return false;
    }    
  }
  
  undoFollow(idSeguindo: number){
    this.pessoaService.getPessoaByEmail(localStorage.getItem("email")).subscribe(
      data => {
        this.pessoaService.undoFollow(idSeguindo, data).subscribe(
          data => {
            this.seguir = false;
            this.getSeguindo(data.id);
            this.getSeguidores(data.id);
          }
        );
      }
    );  
  }

  follow(idSeguindo: number){
    this.pessoaService.getPessoaByEmail(localStorage.getItem("email")).subscribe(
      data => {
        this.pessoaService.setFollow(idSeguindo, data).subscribe(
          data => {
            this.seguir = true;
            this.getSeguindo(data.id);
            this.getSeguidores(data.id);
          }
        );
      }
    );    
  }

  verificarFollow(idPerfil: number){
    let verifica: boolean;
    this.pessoaService.
    verificarFollow(+(localStorage.getItem("idUsuario")), idPerfil).
    subscribe(
      data => {
        this.seguir = data;
      }
    );
  }
}
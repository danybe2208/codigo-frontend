import { Component, OnInit } from '@angular/core';
import { Pessoa, Curriculo, Formacao, InfoAdicionais, Trabalho, Informacao, Notificacao } from '../model/pessoa/pessoa';
import { PessoaService } from '../service/pessoa/pessoa.service';
import { PostService } from '../service/post/post.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

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

  seguindo = [];
  seguidores = [];

  listaDeNotificacao = [];
  notificacoes = [];
  temNotificacao = false;

  constructor(private pessoaService: PessoaService, private postService: PostService) {
    this.postService.getPosts(localStorage.getItem("email")).subscribe(
      data => {
        this.listaPosts = data;
        this.temPost = this.verificarPost();  
      }
    );
  }

  ngOnInit() {
    this.getPessoa();  
    this.getNotificacao();
  }

  getPessoa() {
    this.pessoaService.getPessoaByEmail(localStorage.getItem("email")).subscribe(
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

        console.log(data.interesses);

        if (this.pessoa.interesses == null || this.pessoa.interesses.length == 0) {
          this.temInteresses = false;
        } else {
          this.temInteresses = true;
          this.interesses = this.pessoa.interesses;
        }
        this.getSeguindo(data.id);
        this.getSeguidores(data.id);

        this.cientista = this.verificarPessoa();           
      }
    );    
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
    if(this.listaPosts.length == 0){
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

  getNotificacao(){
    this.pessoaService.getNotificacao(localStorage.getItem("email")).subscribe(
      data => {
        this.listaDeNotificacao = data;
        if(this.listaDeNotificacao.length > 0){
          for (let i = 0; i < this.listaDeNotificacao.length; i++) {
            if(this.listaDeNotificacao[i].tipoPublicacao != null && this.listaDeNotificacao[i].visualizacao == false){              
              let notificacao: Notificacao = new Notificacao();
              notificacao.tipoPublicacao = this.listaDeNotificacao[i].tipoPublicacao;
              notificacao.titulo = this.listaDeNotificacao[i].titulo;
              notificacao.autor = this.listaDeNotificacao[i].autor;
              notificacao.visualizacao = this.listaDeNotificacao[i].visualizacao;
              this.notificacoes.unshift(notificacao);
            }
          }
        }      
        if(this.notificacoes.length > 0){
          this.temNotificacao = true;
        } 
        console.log(this.notificacoes)
      }
    );
  }

}

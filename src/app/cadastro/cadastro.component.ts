import { Component, OnInit } from '@angular/core';
import { Pessoa, Curriculo, Formacao, InfoAdicionais, Trabalho, Informacao } from '../model/pessoa/pessoa';
import { PessoaService } from '../service/pessoa/pessoa.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();

  curriculo: Curriculo = new Curriculo();
  formacao: Formacao = new Formacao();  
  infoAdicionais: InfoAdicionais = new InfoAdicionais();
  informacao: Informacao = new Informacao();
  trabalho: Trabalho = new Trabalho();

  sucesso = false;
  erro = false;
  submiter = true;
  cientista = true;
  comum = false;  

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
  }
  
  cadastroCientista(){
    this.cientista = true;
    this.comum = false;
  }

  cadastroComum(){
    this.cientista = false;
    this.comum = true;
  }

  onSubmitCientista(){    
    this.submiter = false;   
    if(this.informacao.nomePessoa != null &&
      this.informacao.email != null &&
      this.informacao.senha != null &&
      this.infoAdicionais.dataNascimento != null &&
      this.infoAdicionais.dataInicioCientista != null &&
      this.trabalho.cidadeOndeTrabalha != null &&
      this.trabalho.estadoOndeTrabalha != null &&
      this.trabalho.nomeInstituicao != null &&
      this.formacao.nivelDeFormacao != null &&
      this.formacao.localDeFormacao != null &&
      this.curriculo.url != null) {
        this.pessoa.curriculo = this.curriculo;
        this.pessoa.formacao = this.formacao;
        this.pessoa.infoAdicionais = this.infoAdicionais;
        this.pessoa.informacao = this.informacao;
        this.pessoa.trabalho = this.trabalho;
    }
    if(!this.submiter){
      this.pessoaService.getPessoaByEmail(this.informacao.email).subscribe(
        data => {
          if(data == null){
            this.pessoaService.setPessoa(this.pessoa).subscribe(
            );
            this.erro = false;
            this.sucesso = true;
          } else {
            this.erro = true;
            this.sucesso = false;
          }
        }
      )
    }
  }

  onSubmitComum(){
    this.submiter = false;   
    if(this.informacao.nomePessoa != null &&
      this.informacao.email != null &&
      this.informacao.senha != null &&
      this.infoAdicionais.dataNascimento != null &&
      this.formacao.nivelDeFormacao != null &&
      this.formacao.localDeFormacao != null) {        
        this.pessoa.formacao = this.formacao;
        this.pessoa.infoAdicionais = this.infoAdicionais;
        this.pessoa.informacao = this.informacao;
    }
    if(!this.submiter){
      this.pessoaService.getPessoaByEmail(this.informacao.email).subscribe(
        data => {
          if(data == null){
            this.pessoaService.setPessoa(this.pessoa).subscribe(
            );
            this.erro = false;
            this.sucesso = true;
          } else {
            this.erro = true;
            this.sucesso = false;
          }
        }
      )
    }
  }

  
}

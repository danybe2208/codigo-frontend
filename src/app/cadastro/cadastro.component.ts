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
  nacionalidade = true;
  maiorDeIdade = true;

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
  }

  eventCheck(event) {
    this.nacionalidade = event.checked;
    this.submiter = event.checked;
  }

  cadastroCientista() {
    this.cientista = true;
    this.comum = false;
  }

  cadastroComum() {
    this.cientista = false;
    this.comum = true;
  }

  maioridade(a: any) {
    let dataInicioCientista = a;
    const now = new Date();
    const past = new Date(dataInicioCientista);
    const dif = Math.abs(now.getTime() - past.getTime());
    const days = Math.floor(dif / (1000 * 60 * 60 * 24));

    if (days < 6570) {
      return false;
    } else {
      return true;
    }
  }

  onSubmitCientista() {
    if (this.maioridade(this.infoAdicionais.dataNascimento)) {
      this.maiorDeIdade = true;
      if (this.informacao.nomePessoa != null &&
        this.pessoa.email != null &&
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
      this.pessoaService.getPessoaByEmail(this.pessoa.email).subscribe(
        data => {
          if (data == null) {
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
    } else {
      this.maiorDeIdade = false;
    }
  }

  onSubmitComum() {
    if (this.maioridade(this.infoAdicionais.dataNascimento)) {
      this.maiorDeIdade = true;
      if (this.informacao.nomePessoa != null &&
        this.pessoa.email != null &&
        this.informacao.senha != null &&
        this.infoAdicionais.dataNascimento != null &&
        this.formacao.nivelDeFormacao != null &&
        this.formacao.localDeFormacao != null) {
        this.pessoa.formacao = this.formacao;
        this.pessoa.infoAdicionais = this.infoAdicionais;
        this.pessoa.informacao = this.informacao;
      }
      this.pessoaService.getPessoaByEmail(this.pessoa.email).subscribe(
        data => {
          if (data == null) {
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
    } else {
      this.maiorDeIdade = false;
    }
  }

  fechar(){
    this.sucesso = false;
    this.erro = false;
    this.submiter = true;
    this.cientista = true;
    this.comum = false;
    this.nacionalidade = true;
    this.maiorDeIdade = true;
  }
}
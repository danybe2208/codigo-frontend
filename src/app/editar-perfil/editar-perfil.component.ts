import { Component, OnInit } from '@angular/core';
import { Pessoa, Curriculo, Formacao, InfoAdicionais, Trabalho, Informacao } from '../model/pessoa/pessoa';
import { PessoaService } from '../service/pessoa/pessoa.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  cientista = false;
  atualizado = false;

  curriculo: Curriculo = new Curriculo();
  formacao: Formacao = new Formacao();  
  infoAdicionais: InfoAdicionais = new InfoAdicionais();
  informacao: Informacao = new Informacao();
  trabalho: Trabalho = new Trabalho();

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.getPessoa();
  }

  confirmarAtualizacao(){    
    if(this.informacao.nomePessoa != null &&
      this.informacao.email != null &&
      this.informacao.senha != null &&
      this.infoAdicionais.dataNascimento != null &&
      this.formacao.nivelDeFormacao != null &&
      this.formacao.localDeFormacao != null) {  
        this.pessoa.curriculo = this.curriculo;
        this.pessoa.formacao = this.formacao;
        this.pessoa.infoAdicionais = this.infoAdicionais;
        this.pessoa.informacao = this.informacao;
        this.pessoa.trabalho = this.trabalho;
        this.atualizado = true;   
    }
    if(this.atualizado){
      this.pessoaService.updatePessoa(this.pessoa).subscribe();
    }
  }

  getPessoa(){
    let email = localStorage.getItem("email");
    this.pessoaService.getPessoaByEmail(email).subscribe(
      data => {
        this.pessoa = data;
        this.curriculo = data.curriculo;
        this.formacao = data.formacao;
        this.infoAdicionais = data.infoAdicionais;
        this.informacao = data.informacao;
        this.trabalho = data.trabalho;

        this.cientista = this.verificarPessoa();
      }
    )
    
  }

  verificarPessoa() {
    if (this.pessoa.trabalho != null) {
      return true;
    } else {
      return false;
    }
  }

}

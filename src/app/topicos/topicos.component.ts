import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa/pessoa';
import { PessoaService } from '../service/pessoa/pessoa.service';
import { InteresseService } from '../service/topicos/interesse.service';

@Component({
  selector: 'app-topicos',
  templateUrl: './topicos.component.html',
  styleUrls: ['./topicos.component.css']
})
export class TopicosComponent implements OnInit {

  searchText;
  p: number = 1;

  pessoa: Pessoa = new Pessoa();

  glossarios = [];
  selecionados = [];
  interesses = [];

  jaTemInteresse: boolean = true;

  constructor(private interesseService: InteresseService, private pessoaService: PessoaService) {
    this.pessoaService.getPessoaByEmail(localStorage.getItem("email")).subscribe(
      data => {
        this.pessoa = data;
        if(data.interesses != null){
          this.selecionados = data.interesses.split(",")
          if (data.interesses == "" || data.interesses == null) {
            this.jaTemInteresse = true;
          } else {
            this.jaTemInteresse = false;
            this.interesses = this.pessoa.interesses.split(",");
          }
        }        
      }
    )

    this.interesseService.getInteresse().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          var contem = false;
          for (let j = 0; j < this.interesses.length; j++) {
            if (data[i].nome == this.interesses[j]) {
              contem = true;
            }
          }
          if (contem == false) {
            this.glossarios.push(data[i].nome);
          }
        }
      }
    )
  }

  ngOnInit() {
    this.pessoaService.getPessoaByEmail(localStorage.getItem("email")).subscribe(
      data => {
        this.pessoa = data;
        if(data.interesses != null && data.interesses != ""){
          this.selecionados = data.interesses.split(",");
          this.jaTemInteresse = false;
          this.interesses = this.pessoa.interesses.split(",");
        } 
        else if (data.interesses == "" || data.interesses == null) {
          this.jaTemInteresse = true;
        } 
      }
    )
  }

  adicionar(i: any) {
    this.selecionados.push(i);
    if (this.selecionados[0] === "") {
      this.selecionados.splice(this.selecionados.indexOf(''),1);
    }
    
    this.pessoa.interesses = this.selecionados.toString();
    this.pessoaService.updatePessoa(this.pessoa).subscribe();
    this.glossarios.splice(this.glossarios.indexOf(i),1);

    this.jaTemInteresse = false;
  }

  remover(i: any) {
    let array = this.pessoa.interesses.split(",");
    array.splice(array.indexOf(i), 1);
    this.pessoa.interesses = array.toString();
    
    this.glossarios.unshift(i); 
    this.pessoaService.updatePessoa(this.pessoa).subscribe(); 
    this.selecionados.splice(this.selecionados.indexOf(i),1);
  }

  getPessoa() {
    this.pessoaService.getPessoaByEmail(localStorage.getItem("email")).subscribe(
      data => {
        this.pessoa = data;
        this.selecionados = data.interesses.split(",")
        if (data.interesses == "" || data.interesses == null) {
          this.jaTemInteresse = true;
        } else {
          this.jaTemInteresse = false;
          this.interesses = this.pessoa.interesses.split(",");
        }
      }
    )

    this.interesseService.getInteresse().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          var contem = false;
          for (let j = 0; j < this.interesses.length; j++) {
            if (data[i].nome == this.interesses[j]) {
              contem = true;
            }
          }
          if (contem == false) {
            this.glossarios.push(data[i].nome);
          }
        }
      }
    )
  }


}

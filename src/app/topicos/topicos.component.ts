import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa/pessoa';
import { PessoaService } from '../service/pessoa/pessoa.service';
import { InteresseService } from '../service/topicos/interesse.service';
import { Interesse } from '../model/interesse/interesse';

@Component({
  selector: 'app-topicos',
  templateUrl: './topicos.component.html',
  styleUrls: ['./topicos.component.css']
})
export class TopicosComponent implements OnInit {

  searchText;
  p: number = 1;

  pessoa: Pessoa = new Pessoa();

  selecionados = [];
  interesses = [];

  jaTemInteresse: boolean = true;

  constructor(private interesseService: InteresseService, private pessoaService: PessoaService) {    
  }

  getInteresses(){
    this.interesseService.getInteresse().subscribe(
      data => {
        this.interesses = data;
      }
    );
  }

  getGlossario(){
    this.getInteresses();
    let auxInteresses = this.interesses;

    this.getSelecionados();
    let auxSelecionados = this.selecionados;

    for (let i = 0; i < auxSelecionados.length; i++) {
      for (let j = 0; j < auxInteresses.length; j++) {
        if (auxSelecionados[i].nome == auxInteresses[j].nome) {
          auxInteresses.splice(auxInteresses.indexOf(auxSelecionados[i].nome),1);
        }
      }
    }

  }

  getSelecionados(){
    this.pessoaService.getPessoaByEmail(localStorage.getItem("email")).subscribe(
      data => {
        this.pessoa = data;
        if (this.pessoa.interesses == null) {
          this.selecionados = [];
        } else {
          this.selecionados = this.pessoa.interesses;
        }
      }
    );
  }

  ngOnInit() {  
    this.getGlossario();  
  }

  adicionar(interesse: Interesse) {
    this.interesses.splice(this.interesses.indexOf(interesse), 1);
    this.selecionados.push(interesse);

    this.pessoa.interesses = this.selecionados;
    this.pessoaService.updatePessoa(this.pessoa).subscribe();
  }

  remover(interesse: Interesse) {
    this.selecionados.splice(this.selecionados.indexOf(interesse),1);
    this.interesses.unshift(interesse);
    
    this.pessoa.interesses = this.selecionados;
    this.pessoaService.updatePessoa(this.pessoa).subscribe();
  }

}
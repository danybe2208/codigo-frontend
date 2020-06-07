import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa/pessoa';
import { PessoaService } from '../service/pessoa/pessoa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-membros',
  templateUrl: './lista-membros.component.html',
  styleUrls: ['./lista-membros.component.css']
})
export class ListaMembrosComponent implements OnInit {

  searchText;
  membros: Pessoa[] = [];
  temMembros: boolean;

  constructor(private pessoaService: PessoaService, private router: Router) { }

  ngOnInit() {
    this.getMembros();
  }

  getMembros() {
    this.pessoaService.getListaPessoasExceto(localStorage.getItem("email")).subscribe(
      data => {
        this.membros = data;
        this.temMembros = this.verificarMembros();
      }
    );
  }

  goToPerfil(email: string){
    localStorage.setItem("emailPerfil", email);
    this.router.navigateByUrl("perfil");
  }

  verificarMembros() {
    if (this.membros.length > 0) {
      return true;
    } else {
      return false;
    }    
  }

}

import { Component, OnInit } from '@angular/core';
import { Pessoa, Informacao } from '../model/pessoa/pessoa';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PessoaService } from '../service/pessoa/pessoa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  pessoa: Pessoa = new Pessoa();
  p: Pessoa = new Pessoa();

  informacao: Informacao = new Informacao();

  form: FormGroup;
  msgError = false;

  constructor(private router: Router, private loginService: PessoaService, private pessoaService: PessoaService) {
    this.form = new FormGroup({
      email: new FormControl(),
      senha: new FormControl()
    });
    this.pessoa = {
      id: null,
      informacao: null,
      curriculo: null,
      formacao: null,
      infoAdicionais: null,
      interesses: null,
      trabalho: null,
      seguindo: null,
      seguidores: null,
      postsCurtidos: null,
    }
  }

  ngOnInit() {
  }

  onSubmit(){
    this.informacao.email = this.form.get("email").value;
    this.informacao.senha = this.form.get("senha").value;
    
    this.pessoaService.getPessoaByEmail(this.informacao.email).subscribe(
      x => {
        this.pessoa = x;
        this.loginService.login(this.pessoa).subscribe(
          data => {
            if (data) {
              localStorage.setItem("email", this.informacao.email);
              localStorage.setItem("idUsuario", this.pessoa.id.toString());
              this.router.navigateByUrl("home");
            } else {        
              this.msgError = true;
            }      
          }
        );
      }
    )    
  }

}

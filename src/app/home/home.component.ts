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
  
  p: Pessoa = new Pessoa();

  informacao: Informacao = new Informacao();

  form: FormGroup;
  msgError = false;

  constructor(private router: Router, private loginService: PessoaService, private pessoaService: PessoaService) {
    this.form = new FormGroup({
      email: new FormControl(),
      senha: new FormControl()
    });
    this.p = {
      id: null,
      email: "",
      informacao: this.informacao,
      curriculo: null,
      formacao: null,
      infoAdicionais: null,
      interesses: [],
      trabalho: null,
      seguindo: null,
      seguidores: null,
      postsCurtidos: null,
    }
  }

  ngOnInit() {
  }

  onSubmit(){
    this.p.email = this.form.get("email").value;
    this.informacao.senha = this.form.get("senha").value;

    console.log(this.p)
    
    this.pessoaService.getPessoaByEmail(this.p.email).subscribe(
      x => {
        this.p = x;
        this.loginService.login(this.p).subscribe(
          data => {
            if (data) {
              localStorage.setItem("email", this.p.email);
              localStorage.setItem("idUsuario", this.p.id.toString());
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

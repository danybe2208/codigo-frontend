import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';
import { PessoaService } from '../service/pessoa/pessoa.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  cientista: boolean;

  constructor(public authService: AuthService, private router: Router, private pessoaService: PessoaService) { }

  ngOnInit() {
    this.verifica();
  }

  verifica(){
    this.pessoaService.getPessoaByEmail(localStorage.getItem("email")).subscribe(
      data => {
        if(data.curriculo.url == null){
          this.cientista = false;
        } else {
          this.cientista = true;
        }
      }
    )
  }


  logout(){
    localStorage.clear();
  }

}

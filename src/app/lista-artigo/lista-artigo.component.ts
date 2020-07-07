import { Component, OnInit } from '@angular/core';
import { ArtigoService } from '../service/artigo/artigo.service';

@Component({
  selector: 'app-lista-artigo',
  templateUrl: './lista-artigo.component.html',
  styleUrls: ['./lista-artigo.component.css']
})
export class ListaArtigoComponent implements OnInit {

  listaArtigo = [];

  constructor(private artigoService: ArtigoService) { }

  ngOnInit() {
    this.getArtigos();
  }

  getArtigos() {
    this.artigoService.buscaArtigoPorEmail(localStorage.getItem("emailPerfil")).subscribe(
      data => {
        this.listaArtigo = data.sort(function (a, b) {	
          return (a.curtidas < b.curtidas) ? 1 : ((b.curtidas < a.curtidas) ? -1 : 0);
        }).slice(0,10);
      }
    );
    
  }
}

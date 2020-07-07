import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArtigoService } from '../service/artigo/artigo.service';

@Component({
  selector: 'app-artigo-popular',
  templateUrl: './artigo-popular.component.html',
  styleUrls: ['./artigo-popular.component.css']
})
export class ArtigoPopularComponent implements OnInit {

  listaArtigo = [];
  listaTags = [];

  constructor(private artigoService: ArtigoService) { }

  ngOnInit() {
    this.getArtigos();
  }

  getArtigos() {
    this.artigoService.buscaArtigoPorEmail(localStorage.getItem("email")).subscribe(
      data => {
        this.listaArtigo = data.sort(function (a, b) {	
          return (a.curtidas < b.curtidas) ? 1 : ((b.curtidas < a.curtidas) ? -1 : 0);
        }).slice(0,10);

        for (let i = 0; i < this.listaArtigo.length; i++) {
          this.listaTags = this.listaArtigo[i].conteudo.tags.split(",");  
        }
      }
    );
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Artigo } from '../model/post/post';
import { ArtigoService } from '../service/artigo/artigo.service';

@Component({
  selector: 'app-artigo-perfil',
  templateUrl: './artigo-perfil.component.html',
  styleUrls: ['./artigo-perfil.component.css']
})
export class ArtigoPerfilComponent implements OnInit {

  @Input() artigo: Artigo = new Artigo();

  status: any;
  listaTags: any;
  
  constructor(private artigoService: ArtigoService) {    
  }

  ngOnInit() {
    this.verificar();
    this.listaTags = this.artigo.conteudo.tags.split(",");  
  }

  analisePost(idPostCurtido: number, idPessoaCurtiu: number){
    this.artigoService.analisarArtigo(idPostCurtido, idPessoaCurtiu).subscribe(
      data => {
        if(data){
          this.status = "Descurtir";
        } else {
          this.status = "Curtir";
        }
      }
    )
  }

  verificar(){
    this.analisePost(this.artigo.id, +(localStorage.getItem("idUsuario")));
  }

  botao(idPostCurtido: number){
    if(this.status == "Curtir"){
      this.artigoService.curtirArtigo(+(localStorage.getItem("idUsuario")), idPostCurtido).subscribe(
        data => {
          this.artigo = data;
          this.analisePost(this.artigo.id ,+(localStorage.getItem("idUsuario")));
        }
      );
    } else if (this.status == "Descurtir") {
      this.artigoService.undoCurtirArtigo(+(localStorage.getItem("idUsuario")), idPostCurtido).subscribe(
        data => {
          this.artigoService = data;
          this.analisePost(this.artigo.id ,+(localStorage.getItem("idUsuario")));
        }
      );
    }
  }
}

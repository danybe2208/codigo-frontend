import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { ListaPostsComponent } from './lista-posts/lista-posts.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { ListaMembrosComponent } from './lista-membros/lista-membros.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { TopicosComponent } from './topicos/topicos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PostComponent } from './post/post.component';
import { ListaPostComponent } from './lista-post/lista-post.component';
import { PostPerfilComponent } from './post-perfil/post-perfil.component';
import { ArtigoComponent } from './artigo/artigo.component';
import { ArtigoPopularComponent } from './artigo-popular/artigo-popular.component';
import { PostPopularComponent } from './post-popular/post-popular.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    HomeComponent,
    MenuComponent,
    PaginaInicialComponent,
    ListaPostsComponent,
    MenuLateralComponent,
    ListaMembrosComponent,
    EditarPerfilComponent,
    TopicosComponent,
    PerfilComponent,
    PostComponent,
    ListaPostComponent,
    PostPerfilComponent,
    ArtigoComponent,
    ArtigoPopularComponent,
    PostPopularComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

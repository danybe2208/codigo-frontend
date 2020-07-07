import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { AuthGuard } from './guard/auth.guard';
import { ListaMembrosComponent } from './lista-membros/lista-membros.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { TopicosComponent } from './topicos/topicos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ArtigoComponent } from './artigo/artigo.component';
import { ArtigoPopularComponent } from './artigo-popular/artigo-popular.component';
import { PostPopularComponent } from './post-popular/post-popular.component';


const routes: Routes = [
  {path:"login", component: HomeComponent},  
  {path:"cadastro", component: CadastroComponent},

  {path:"membros", component: ListaMembrosComponent, canActivate: [AuthGuard]},
  {path:"", component: PaginaInicialComponent, canActivate: [AuthGuard]},
  {path:"editar", component: EditarPerfilComponent, canActivate: [AuthGuard]},
  {path:"topicos", component: TopicosComponent, canActivate: [AuthGuard]},
  {path:"perfil", component: PerfilComponent, canActivate: [AuthGuard]},
  {path:"artigos", component: ArtigoComponent, canActivate: [AuthGuard]},

  {path:"artigo-popular", component: ArtigoPopularComponent, canActivate: [AuthGuard]},
  {path:"post-popular", component: PostPopularComponent, canActivate: [AuthGuard]},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
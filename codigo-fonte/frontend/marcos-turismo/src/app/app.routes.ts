import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { AvaliacaoComponent } from './components/avaliacao/avaliacao.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ExcursoesComponent } from './components/excursoes/excursoes.component';
import { FrotaComponent } from './components/frota/frota.component';
import { FrotasComponent } from './components/frotas/frotas.component';
import { ViagensComponent } from './components/viagens/viagens.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HistoriasComponent } from './components/historias/historias.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { Excursoes2Component } from './components/excursoes2/excursoes2.component';
import { NossahistoriaComponent } from './components/nossahistoria/nossahistoria.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServicoComponent } from './components/servico/servico.component';

export const routes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'avaliacao', component: AvaliacaoComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'excursoes', component: ExcursoesComponent },
  { path: 'frota', component: FrotaComponent },
  { path: 'viagens', component: ViagensComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'historias', component: HistoriasComponent },
  { path: 'excursoes2', component: Excursoes2Component },
  { path: 'nossahistoria', component: NossahistoriaComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'historias', component: HistoriasComponent },
  { path: 'contatos', component: ContatosComponent },
  { path: 'excursoes2', component: Excursoes2Component },
  { path: 'frotas', component: FrotasComponent },
  { path: 'servico', component: ServicoComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Redireciona para 'home' ao acessar a raiz
];

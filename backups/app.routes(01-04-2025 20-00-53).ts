import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { AvaliacaoComponent } from './components/avaliacao/avaliacao.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ExcursoesComponent } from './components/excursoes/excursoes.component';
import { FrotaComponent } from './components/frota/frota.component';
import { ViagensComponent } from './components/viagens/viagens.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NossahistoriaComponent } from './components/nossahistoria/nossahistoria.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'avaliacao', component: AvaliacaoComponent },
  { path: 'excursoes', component: ExcursoesComponent },
  { path: 'frota', component: FrotaComponent },
  { path: 'viagens', component: ViagensComponent },
  { path: 'nossahistoria', component: NossahistoriaComponent },
  { path: 'navbar', component: NavbarComponent }
  { path: 'login', component: LoginComponent},
  { path: 'avaliacao', component: AvaliacaoComponent},
  { path: 'cliente', component: ClienteComponent},
  { path: 'excursoes', component: ExcursoesComponent},
  { path: 'frota', component: FrotaComponent},
  { path: 'viagens', component: ViagensComponent},
  { path: 'nossahistoria', component: NossahistoriaComponent},
  { path: '', redirectTo: '/usuario', pathMatch: 'full' } // opcional
];

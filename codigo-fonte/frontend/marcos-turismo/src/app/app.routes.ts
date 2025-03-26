import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';

import path from 'node:path';
import { LoginComponent } from './components/login/login.component';
import { AvaliacaoComponent } from './components/avaliacao/avaliacao.component';
import { ClienteComponent } from './components/cliente/cliente.component';
<<<<<<< Updated upstream
import { FrotaComponent } from './components/frota/frota.component';
=======
import { ViagensComponent } from './components/viagens/viagens.component';
>>>>>>> Stashed changes

export const routes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: 'login', component: LoginComponent},
  { path: 'avaliacao', component: AvaliacaoComponent},
  { path: 'cliente', component: ClienteComponent},
<<<<<<< Updated upstream
  { path: 'frota', component: FrotaComponent},
=======
  { path: 'viagens', component: ViagensComponent},
>>>>>>> Stashed changes
  { path: '', redirectTo: '/usuario', pathMatch: 'full' } // opcional
];

import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';

import path from 'node:path';
import { LoginComponent } from './components/login/login.component';
import { AvaliacaoComponent } from './components/avaliacao/avaliacao.component';
import { ClienteComponent } from './components/cliente/cliente.component';

export const routes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: 'login', component: LoginComponent},
  { path: 'avaliacao', component: AvaliacaoComponent},
  { path: 'cliente', component: ClienteComponent},
  { path: '', redirectTo: '/usuario', pathMatch: 'full' } // opcional
];

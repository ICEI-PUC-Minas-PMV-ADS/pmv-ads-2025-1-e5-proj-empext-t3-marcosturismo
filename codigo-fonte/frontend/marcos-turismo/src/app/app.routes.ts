import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';

import path from 'node:path';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: 'login', component: LoginComponent},

  { path: '', redirectTo: '/usuario', pathMatch: 'full' } // opcional
];

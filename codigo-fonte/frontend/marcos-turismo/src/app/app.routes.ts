import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';

export const routes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: '', redirectTo: '/usuario', pathMatch: 'full' } // opcional
];

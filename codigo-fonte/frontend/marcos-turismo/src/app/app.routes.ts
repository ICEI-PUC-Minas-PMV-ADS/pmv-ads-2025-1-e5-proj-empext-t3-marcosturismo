import { Routes } from '@angular/router';

import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { AvaliacaoComponent } from './components/avaliacao/avaliacao.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ExcursoesComponent } from './components/excursoes/excursoes.component';
import { FrotaComponent } from './components/frota/frota.component';
import { ViagensComponent } from './components/viagens/viagens.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServicoComponent } from './components/servico/servico.component';
import { ChecklistComponent } from './components/checklist/checklist.component';

export const routes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'avaliacao', component: AvaliacaoComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'excursoes', component: ExcursoesComponent },
  { path: 'frota', component: FrotaComponent },
  { path: 'viagens', component: ViagensComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'servico', component: ServicoComponent },
  { path: 'checklist', component: ChecklistComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redireciona para 'login' ao acessar a raiz
];

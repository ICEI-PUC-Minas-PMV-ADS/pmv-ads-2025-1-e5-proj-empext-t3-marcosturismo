import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<boolean>();  // Emitir estado da sidebar
  isSidebarActive = false;  // Inicializa a sidebar como fechada

  constructor(private router: Router) {}

  ngOnInit() {}

  // Alterna a visibilidade da sidebar e emite o novo estado
  toggleSidebarFunction() {
    this.isSidebarActive = !this.isSidebarActive;
    this.toggleSidebar.emit(this.isSidebarActive);  // Emite para o componente pai
  }

  // Método de navegação para outras rotas
  navigate(route: string) {
    this.router.navigate([route]);
  }

  // Lógica de logout
  logout() {
    localStorage.removeItem('authToken');  // Remove o token de autenticação
    sessionStorage.clear();  // Limpa a sessão

    console.log('User logged out successfully');
    this.router.navigate(['/home']);  // Redireciona para a página inicial ou login
  }
}

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
  @Output() toggleSidebar = new EventEmitter<boolean>();
  isSidebarActive = true;  // em desktop, inicia aberta

  constructor(private router: Router) {}

  ngOnInit() {
    // Se for dispositivo móvel/tablet (≤ 768px), inicia fechada (círculo)
    if (window.innerWidth <= 768) {
      this.isSidebarActive = false;
      this.toggleSidebar.emit(this.isSidebarActive);
    }

    // (Opcional) Se o usuário redimensionar a janela:
    window.addEventListener('resize', () => {
      const isMobileNow = window.innerWidth <= 768;
      if (isMobileNow && this.isSidebarActive) {
        // Se passar para mobile com sidebar aberta, fecha ela
        this.isSidebarActive = false;
        this.toggleSidebar.emit(this.isSidebarActive);
      }
      // (Você pode adicionar lógica inversa se quiser que em desktop fique sempre aberta,
      // mas isso já está coberto pelo valor padrão isSidebarActive=true)
    });
  }

  // Ao clicar no círculo (hambúrguer), alterna para “sidebar aberta”
  toggleSidebarFunction() {
    this.isSidebarActive = !this.isSidebarActive;
    this.toggleSidebar.emit(this.isSidebarActive);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    console.log('User logged out successfully');
    this.router.navigate(['/home']);
  }
}

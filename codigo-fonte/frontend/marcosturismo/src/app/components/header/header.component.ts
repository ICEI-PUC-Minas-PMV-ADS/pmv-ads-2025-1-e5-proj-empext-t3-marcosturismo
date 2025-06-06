import { Component, HostListener } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navItems = [
    { label: 'Início', id: 'home' },
    { label: 'Sobre', id: 'sobre' },
    { label: 'Serviços', id: 'servicos' },
    { label: 'Frota', id: 'frota' },
    { label: 'Histórias', id: 'historias' },
    { label: 'Contato', id: 'contato' }
  ];
  constructor(private location: Location) { }
  activeSection = 'home';
  menuOpen = true;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70; // Ajuste por causa do header fixo
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      // Atualiza a URL sem recarregar
      this.location.replaceState(`/${sectionId}`);

      this.activeSection = sectionId;

      this.closeMenu(); 
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    for (const item of this.navItems) {
      const el = document.getElementById(item.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = item.id;
        }
      }
    }
  }
}

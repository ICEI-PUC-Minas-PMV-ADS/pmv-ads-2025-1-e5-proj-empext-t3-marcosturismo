import { FormsModule } from '@angular/forms';
import { AfterViewInit, Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  isMobile = false;
  @ViewChild('sidebar') sidebar!: SidebarComponent;
  isSidebarActive = true;
  showLayout = true;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  onToggleSidebar(active: boolean) {
    this.isSidebarActive = active;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;

      window.addEventListener('resize', () => {
        this.isMobile = window.innerWidth <= 768;
      });

      // Detectar rota atual
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.checkRouteForLayout(event.urlAfterRedirects);
        }
      });
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
      window.addEventListener('resize', () => {
        this.isMobile = window.innerWidth <= 768;
      });
    }
  }

  checkRouteForLayout(url: string) {
    // Esconder sidebar/topbar nas rotas desejadas
    const routesWithoutLayout = ['/login'];  // Adicione outras rotas aqui

    this.showLayout = !routesWithoutLayout.includes(url);
  }
}

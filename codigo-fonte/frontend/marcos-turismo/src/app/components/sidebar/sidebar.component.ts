import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSidebarActive = true;
  windowWidth: number = 0;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;

      if (this.windowWidth <= 768) {
        this.isSidebarActive = false;
      }

      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
        if (this.windowWidth > 768) {
          this.isSidebarActive = true;
        } else {
          this.isSidebarActive = false;
        }
      });
    }
  }

  toggleSidebarFunction() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}

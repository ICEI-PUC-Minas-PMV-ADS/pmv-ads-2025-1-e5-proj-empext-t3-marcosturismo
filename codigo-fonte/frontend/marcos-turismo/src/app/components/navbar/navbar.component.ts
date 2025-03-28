import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importing Router

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  // Use styleUrls instead of styleUrl
})
export class NavbarComponent {

  constructor(private router: Router) {}

  navigateToAvaliacao() {
    this.router.navigate(['/login']);
  }
}

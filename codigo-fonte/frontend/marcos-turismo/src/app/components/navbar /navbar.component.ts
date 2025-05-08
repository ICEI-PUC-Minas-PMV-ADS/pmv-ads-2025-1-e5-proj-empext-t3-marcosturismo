import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';  // Correção: importa Router e RouterModule de uma vez

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],  // Corrigido: mantém apenas um import de RouterModule
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  // Uso correto de styleUrls no plural
})
export class NavbarComponent {

  constructor(private router: Router) {}

  navigateToAvaliacao() {
    this.router.navigate(['/login']);  // Navegação para a página de login
  }
}

import { Component } from '@angular/core';
<<<<<<< Updated upstream
import { Router, RouterModule } from '@angular/router';  // Correção: importa Router e RouterModule de uma vez
=======
import { Router, RouterModule } from '@angular/router';  // Importando Router e RouterModule de forma correta
>>>>>>> Stashed changes

@Component({
  selector: 'app-navbar',
  standalone: true,
<<<<<<< Updated upstream
  imports: [RouterModule],  // Corrigido: mantém apenas um import de RouterModule
=======
  imports: [RouterModule],
>>>>>>> Stashed changes
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  // Uso correto de styleUrls no plural
})
export class NavbarComponent {

  constructor(private router: Router) {}

  navigateToAvaliacao() {
    this.router.navigate(['/login']);  // Navegação para a página de login
  }
}

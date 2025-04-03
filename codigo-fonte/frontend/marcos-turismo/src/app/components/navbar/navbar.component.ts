import { Component } from '@angular/core';
<<<<<<< Updated upstream
import { Router, RouterModule } from '@angular/router';  // Correção: importa Router e RouterModule de uma vez
=======
import { Router } from '@angular/router';  // Importing Router
import { RouterModule } from '@angular/router';
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
  styleUrls: ['./navbar.component.css']  // Corrigido: uso de styleUrls (plural)
})
export class NavbarComponent {

  constructor(private router: Router) {}

  navigateToAvaliacao() {
    this.router.navigate(['/login']);
  }
}

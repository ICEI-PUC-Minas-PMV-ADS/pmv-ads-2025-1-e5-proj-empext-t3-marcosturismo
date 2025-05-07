import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";  // Importação correta e única

@Component({
  selector: 'app-nossahistoria',
  standalone: true,  // Apenas se o componente for standalone
  imports: [NavbarComponent],  // Esta linha é correta para standalone components
  templateUrl: './nossahistoria.component.html',
  styleUrls: ['./nossahistoria.component.css']  // Corrigido de 'styleUrl' para 'styleUrls'
})
export class NossahistoriaComponent {
  // Lógica do componente
}
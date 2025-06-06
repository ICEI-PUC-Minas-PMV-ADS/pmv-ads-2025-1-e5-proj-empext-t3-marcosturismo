import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  soliciarOrcamento() {

    // URL do WhatsApp
    const whatsappUrl = `https://wa.me/${environment.phoneMarcos}`;

    // Abrir o WhatsApp no navegador
    window.open(whatsappUrl, '_blank');
  }
}

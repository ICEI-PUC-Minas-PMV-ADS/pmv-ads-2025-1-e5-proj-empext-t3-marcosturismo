import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-avaliacao',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent {
  
  confirmarAvaliacao(): void {
    console.log('Avaliação confirmada!');
  }

  excluirAvaliacao(): void {
    console.log('Avaliação excluída!');
  }
}

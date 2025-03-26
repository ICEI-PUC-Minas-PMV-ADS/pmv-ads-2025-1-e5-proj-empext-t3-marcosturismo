import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-excursoes',
  standalone:  true,
  imports: [FormsModule, CommonModule],
  templateUrl: './excursoes.component.html',
  styleUrls: ['./excursoes.component.css']
})
export class ExcursoesComponent {
  excursoes: any[] = [];

  selecionarImagem(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.excursoes[index].imagem = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  apagarCard(index: number) {
    if (confirm("Tem certeza que deseja excluir este card?")) {
      this.excursoes.splice(index, 1);
    }
  }

  adicionarCard() {
    this.excursoes.push({ imagem: 'placeholder.jpg', descricao: '' });
  }
}

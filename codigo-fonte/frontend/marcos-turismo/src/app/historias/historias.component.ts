import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historias',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.css']
})
export class HistoriasComponent {
  viagens = [
    { imagem: 'logo.jpg', descricao: 'Viagem 1', mensagem: 'Tivemos uma experiência incrível! Organização e conforto impecáveis.' },
    { imagem: 'logo.jpg', descricao: 'Viagem 2', mensagem: 'A melhor viagem que já fizemos! Motoristas atenciosos e muita segurança.' },
    { imagem: 'logo.jpg', descricao: 'Viagem 3', mensagem: 'Recomendo demais! Tudo perfeito, do início ao fim da viagem.' }
  ];

  avaliacao = {
    nome: '',
    estrelas: 0,
    foto: null,
    comentario: ''
  };

  // Lidar com o arquivo selecionado
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Verifica se o arquivo é uma imagem
      const allowedExtensions = ['image/jpeg', 'image/png', 'image/gif'];
      if (allowedExtensions.includes(file.type)) {
        this.avaliacao.foto = file;
      } else {
        alert('Por favor, selecione uma imagem válida (JPEG, PNG, GIF).');
      }
    }
  }

  registrarAvaliacao() {
    if (this.avaliacao.nome && this.avaliacao.estrelas > 0 && this.avaliacao.comentario) {
      console.log('Avaliação registrada:', this.avaliacao);
    } else {
      alert('Por favor, preencha todos os campos antes de registrar a avaliação.');
    }
  }

  cancelarAvaliacao() {
    console.log('Avaliação cancelada');
    this.avaliacao = { nome: '', estrelas: 0, foto: null, comentario: '' };
  }
}

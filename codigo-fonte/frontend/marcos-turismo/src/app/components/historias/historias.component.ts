import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
<<<<<<< Updated upstream
=======
import { HttpClient } from '@angular/common/http'; // Importando HttpClient
import { HttpClientModule } from '@angular/common/http';
>>>>>>> Stashed changes

@Component({
  selector: 'app-historias',
  standalone: true,
<<<<<<< Updated upstream
  imports: [CommonModule, NavbarComponent, FormsModule],
=======
  imports: [CommonModule, NavbarComponent, FormsModule, HttpClientModule],
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
  stars = [1, 2, 3, 4, 5]; // 5 estrelas para o rating

  mensagem = ''; // Mensagem de sucesso ou erro
  tipoMensagem = ''; // 'sucesso' ou 'erro'

  private apiUrl = 'http://localhost:8080/'; // URL do endpoint para enviar a avaliação

  constructor(private http: HttpClient) {}

>>>>>>> Stashed changes
  // Lidar com o arquivo selecionado
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
<<<<<<< Updated upstream
      // Verifica se o arquivo é uma imagem
=======
>>>>>>> Stashed changes
      const allowedExtensions = ['image/jpeg', 'image/png', 'image/gif'];
      if (allowedExtensions.includes(file.type)) {
        this.avaliacao.foto = file;
      } else {
<<<<<<< Updated upstream
        alert('Por favor, selecione uma imagem válida (JPEG, PNG, GIF).');
=======
        this.mostrarMensagem('Por favor, selecione uma imagem válida (JPEG, PNG, GIF).', 'erro');
>>>>>>> Stashed changes
      }
    }
  }

<<<<<<< Updated upstream
  registrarAvaliacao() {
    if (this.avaliacao.nome && this.avaliacao.estrelas > 0 && this.avaliacao.comentario) {
      console.log('Avaliação registrada:', this.avaliacao);
    } else {
      alert('Por favor, preencha todos os campos antes de registrar a avaliação.');
    }
  }

=======
  // Registrar avaliação
  registrarAvaliacao() {
    if (this.avaliacao.nome && this.avaliacao.estrelas > 0 && this.avaliacao.comentario) {
      const formData = new FormData();
      formData.append('nome', this.avaliacao.nome);
      formData.append('estrelas', this.avaliacao.estrelas.toString());
      formData.append('comentario', this.avaliacao.comentario);

      if (this.avaliacao.foto) {
        formData.append('foto', this.avaliacao.foto, (this.avaliacao.foto as File).name);
      }

      this.http.post(this.apiUrl, formData).subscribe(
        (response) => {
          console.log('Avaliação registrada:', response);
          this.mostrarMensagem('Sua avaliação foi registrada com sucesso!', 'sucesso');
          this.cancelarAvaliacao(); // Limpar os campos após o envio
        },
        (error) => {
          console.error('Erro ao registrar avaliação:', error);
          this.mostrarMensagem('Ocorreu um erro ao registrar a avaliação. Tente novamente mais tarde.', 'erro');
        }
      );
    } else {
      this.mostrarMensagem('Por favor, preencha todos os campos antes de registrar a avaliação.', 'erro');
    }
  }

  // Cancelar avaliação
>>>>>>> Stashed changes
  cancelarAvaliacao() {
    console.log('Avaliação cancelada');
    this.avaliacao = { nome: '', estrelas: 0, foto: null, comentario: '' };
  }
<<<<<<< Updated upstream
=======

  // Método para definir a avaliação (número de estrelas)
  setRating(rating: number): void {
    this.avaliacao.estrelas = rating;
  }

  // Exibir mensagem de sucesso ou erro
  mostrarMensagem(mensagem: string, tipo: string) {
    this.mensagem = mensagem;
    this.tipoMensagem = tipo;

    // Esconder a mensagem após 5 segundos
    setTimeout(() => {
      this.mensagem = '';
      this.tipoMensagem = '';
    }, 5000);
  }
>>>>>>> Stashed changes
}

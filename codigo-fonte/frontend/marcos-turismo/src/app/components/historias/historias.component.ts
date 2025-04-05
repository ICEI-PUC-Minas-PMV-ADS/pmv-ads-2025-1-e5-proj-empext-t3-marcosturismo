import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Importando HttpClient
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-historias',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, HttpClientModule],
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


  stars = [1, 2, 3, 4, 5]; // 5 estrelas para o rating

  mensagem = ''; // Mensagem de sucesso ou erro
  tipoMensagem = ''; // 'sucesso' ou 'erro'

  private apiUrl = 'http://localhost:8080/'; // URL do endpoint para enviar a avaliação

  constructor(private http: HttpClient) { }

  // Lidar com o arquivo selecionado
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Verifica se o arquivo é uma imagem
      const allowedExtensions = ['image/jpeg', 'image/png', 'image/gif'];
      if (allowedExtensions.includes(file.type)) {
        this.avaliacao.foto = file;
      } else {

        this.mostrarMensagem('Por favor, selecione uma imagem válida (JPEG, PNG, GIF).', 'erro');
      }
    }
  }

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
  cancelarAvaliacao() {
    console.log('Avaliação cancelada');
    this.avaliacao = { nome: '', estrelas: 0, foto: null, comentario: '' };
  }

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
}

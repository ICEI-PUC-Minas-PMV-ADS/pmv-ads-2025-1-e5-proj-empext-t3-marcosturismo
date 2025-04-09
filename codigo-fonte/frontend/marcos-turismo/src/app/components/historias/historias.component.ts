import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-historias',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, HttpClientModule], 
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.css']
})
export class HistoriasComponent implements OnInit {

  viagens = [
    { imagem: 'logo.jpg', descricao: 'Viagem 1', mensagem: 'Tivemos uma experiência incrível!' },
    { imagem: 'logo.jpg', descricao: 'Viagem 2', mensagem: 'A melhor viagem que já fizemos!' },
    { imagem: 'logo.jpg', descricao: 'Viagem 3', mensagem: 'Recomendo demais!' }
  ];

  avaliacoesValidas: any[] = [];
  avaliacao = { autor: '', titulo: '', descricao: '', nota: 0, dataPublicacao: 0, foto: null };
  stars = [1, 2, 3, 4, 5];
  mensagem = '';
  tipoMensagem = '';
  private apiUrl = 'http://localhost:8080/avaliacao';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarAvaliacoes();
  }

  carregarAvaliacoes(): void {
    this.http.get<any[]>(`${this.apiUrl}/validas`, { headers: this.getAuthHeaders() }).subscribe(
      (avaliacoes: any[]) => {
        this.avaliacoesValidas = avaliacoes;
        console.log('Avaliações válidas:', this.avaliacoesValidas);
      },
      (error) => {
        console.error('Erro ao carregar avaliações válidas:', error);
        alert('Erro ao carregar avaliações válidas');
      }
    );
  }

  registrarAvaliacao() {
    if (this.avaliacao.autor && this.avaliacao.titulo && this.avaliacao.descricao && this.avaliacao.nota > 0) {
      const payload = {
        autor: this.avaliacao.autor,
        titulo: this.avaliacao.titulo,
        descricao: this.avaliacao.descricao,
        nota: this.avaliacao.nota,
        dataPublicacao: new Date().getTime(),
        foto: this.avaliacao.foto
      };

      this.sendAvaliacaoRequest(payload);
    } else {
      this.mostrarMensagem('Por favor, preencha todos os campos antes de registrar a avaliação.', 'erro');
    }
  }

  sendAvaliacaoRequest(payload: any) {
    this.http.post<HttpResponse<any>>(this.apiUrl, payload).subscribe(
      (response) => this.handleSuccess(response),
      (error) => this.handleError(error)
    );
  }

  handleSuccess(response: HttpResponse<any>) {
    console.log('Avaliação registrada com sucesso:', response);
    this.mostrarMensagem('Sua avaliação foi registrada com sucesso!', 'sucesso');
    this.cancelarAvaliacao();
    this.carregarAvaliacoes();
  }

  handleError(error: HttpErrorResponse) {
    console.error('Erro ao registrar avaliação:', error);
    this.mostrarMensagem('Ocorreu um erro ao registrar a avaliação. Tente novamente mais tarde.', 'erro');
  }

  cancelarAvaliacao() {
    this.avaliacao = { autor: '', titulo: '', descricao: '', nota: 0, dataPublicacao: 0, foto: null };
  }

  setRating(rating: number): void {
    this.avaliacao.nota = rating;
  }

  mostrarMensagem(mensagem: string, tipo: string) {
    this.mensagem = mensagem;
    this.tipoMensagem = tipo;

    setTimeout(() => {
      this.mensagem = '';
      this.tipoMensagem = '';
    }, 5000);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (!token) {
      alert("Token não encontrado!");
    }
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedExtensions = ['image/jpeg', 'image/png', 'image/gif'];
      if (allowedExtensions.includes(file.type)) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size <= maxSize) {
          this.avaliacao.foto = file;
        } else {
          this.mostrarMensagem('O arquivo é muito grande. O tamanho máximo permitido é 5MB.', 'erro');
        }
      } else {
        this.mostrarMensagem('Por favor, selecione uma imagem válida (JPEG, PNG, GIF).', 'erro');
      }
    }
  }
}

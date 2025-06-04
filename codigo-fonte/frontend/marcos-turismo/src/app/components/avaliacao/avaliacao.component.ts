import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { PLATFORM_ID, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-avaliacao',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HttpClientModule],
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {

  avaliacoes: any[] = [];
  avaliacoesValidas: any[] = [];

  private apiUrl = `${environment.apiUrl}/avaliacao`;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.carregarAvaliacoes();
  }

  // Função para carregar avaliações (as que vêm do componente Historia)
  carregarAvaliacoes(): void {
  this.http.get<any[]>(`${this.apiUrl}`, { headers: this.getAuthHeaders() }).subscribe(
    (avaliacoes) => {
      console.log('Todas as avaliações:', avaliacoes);

      // Filtra as avaliações por status
      this.avaliacoes = avaliacoes.filter(avaliacao => avaliacao.status === 'AValidar');
      this.avaliacoesValidas = avaliacoes.filter(avaliacao => avaliacao.status === 'Valida');
    },
    (error) => {
      console.error('Erro ao listar avaliações:', error);
      alert('Erro ao carregar avaliações');
    }
  );
}

  // Função para validar avaliação
  validarAvaliacao(avaliacaoId: string): void {
    this.http.put(`${this.apiUrl}/validar/${avaliacaoId}`, {}, {
      headers: this.getAuthHeaders(),
      responseType: 'text'  // Mudança para tratar a resposta como texto
    }).subscribe(
      (response) => {
        console.log('Resposta da API (texto):', response);
        console.log('Avaliação validada com sucesso!');

        // Atualizando a lista de avaliações e movendo para a lista de válidas
        const avaliacao = this.avaliacoes.find(a => a.id === avaliacaoId);
        if (avaliacao) {
          avaliacao.status = 'Valida';  // Ajuste do status da avaliação
          this.avaliacoesValidas.push(avaliacao);  // Adiciona na lista de avaliações válidas
          this.avaliacoes = this.avaliacoes.filter(a => a.id !== avaliacaoId);  // Remove da lista de pendentes
        }
      },
      (error) => {
        console.error('Erro ao validar avaliação:', error);
        alert('Erro ao validar avaliação');
      }
    );
  }

  // Função para excluir avaliação
  excluirAvaliacao(avaliacaoId: string): void {
    this.http.delete(`${this.apiUrl}/${avaliacaoId}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text'  // Mudança para tratar a resposta como texto
    }).subscribe(
      (response) => {
        console.log('Resposta da API (texto):', response);
        console.log('Avaliação excluída com sucesso!');
        // Removendo da lista de avaliações pendentes
        this.avaliacoes = this.avaliacoes.filter(a => a.id !== avaliacaoId);
      },
      (error) => {
        console.error('Erro ao excluir avaliação:', error);
        if (error.status) {
          console.error('Código de status:', error.status);  // Código de status da requisição
        }
        alert('Erro ao excluir avaliação');
      }
    );
  }

  // Função para obter os cabeçalhos de autenticação
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Token:', token);  // Verifique se o token está sendo capturado
    if (!token) {
      alert("Token não encontrado!");
    }
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }
}

import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

interface Viagem {
  id: string;
  motorista: string;
  tipoServico: string;
  dataInicio: string;
  dataVolta: string;
}

interface Usuario {
  id: string;
  nome: string;
}

@Component({
  selector: 'app-viagens',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './viagens.component.html',
  styleUrls: ['./viagens.component.css']
})
export class ViagensComponent implements OnInit, OnDestroy {
  motorista: string = '';
  tipoServico: string = 'excursao';
  dataInicio: string = '';
  dataVolta: string = '';
  viagens: Viagem[] = [];
  usuarios: Usuario[] = [];
  mensagem: string = '';
  mensagemTipo: 'success' | 'error' | '' = '';
  modalAberto: boolean = false;  // Controle do modal

  apiUrl: string = `${environment.apiUrl}/viagem`;
  private baseUrl = `${environment.apiUrl}/usuario`;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.viagens = [];
      this.usuarios = [];
      this.loadViagens();
      this.loadUsuarios();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('viagens', JSON.stringify(this.viagens));
    }
  }

  private getAuthHeaders(): HttpHeaders {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : ''
      });
    } else {
      return new HttpHeaders({ 'Content-Type': 'application/json' });
    }
  }

  loadViagens() {
    this.getViagens().subscribe({
      next: (data: Viagem[]) => {
        this.viagens = data ?? [];
        this.mensagem = '';
        this.mensagemTipo = '';
      },
      error: this.handleError.bind(this)
    });
  }

  loadUsuarios() {
    this.http.get<Usuario[]>(`${this.baseUrl}`, { headers: this.getAuthHeaders() }).subscribe({
      next: (data) => {
        this.usuarios = data ?? [];
      },
      error: this.handleError.bind(this)
    });
  }

  getViagens(): Observable<Viagem[]> {
    return this.http.get<Viagem[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  incluir() {
    if (!this.motorista || !this.dataInicio || !this.dataVolta) {
      this.mensagem = 'Por favor, preencha os campos obrigatórios!';
      this.mensagemTipo = 'error';
      return;
    }

    const novaViagem = {
      motorista: this.motorista,
      tipoServico: this.tipoServico,
      dataInicio: this.dataInicio,
      dataVolta: this.dataVolta
    };

    this.http.post(this.apiUrl, novaViagem, { headers: this.getAuthHeaders() }).subscribe({
      next: () => {
        this.mensagem = 'Viagem registrada com sucesso!';
        this.mensagemTipo = 'success';
        this.loadViagens();
        this.motorista = '';
        this.tipoServico = 'excursao';
        this.dataInicio = '';
        this.dataVolta = '';
        this.closeModal();  // Fecha o modal após salvar
      },
      error: this.handleError.bind(this)
    });
  }

  excluir() {
    if (!this.viagens || this.viagens.length === 0) {
      this.mensagem = 'Não há viagens para excluir.';
      this.mensagemTipo = 'error';
      return;
    }

    const ultimaViagem = this.viagens[this.viagens.length - 1];

    if (!ultimaViagem.id) {
      this.mensagem = 'Viagem inválida para exclusão.';
      this.mensagemTipo = 'error';
      return;
    }

    this.http.delete(`${this.apiUrl}/${ultimaViagem.id}`, { headers: this.getAuthHeaders() }).subscribe({
      next: () => {
        this.mensagem = 'Viagem excluída com sucesso!';
        this.mensagemTipo = 'success';
        this.viagens = this.viagens.filter(v => v.id !== ultimaViagem.id) ?? [];
      },
      error: this.handleError.bind(this)
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erro completo:', error);
    switch (error.status) {
      case 400:
        this.mensagem = error.error || 'Dados inválidos. Verifique os campos.';
        break;
      case 401:
        this.mensagem = 'Sessão expirada. Faça login novamente.';
        this.router.navigate(['/login']);
        break;
      case 403:
        this.mensagem = 'Acesso negado. Você não tem permissão.';
        break;
      case 500:
        this.mensagem = 'Erro interno do servidor. Tente novamente.';
        break;
      default:
        this.mensagem = error.error || 'Erro ao processar a solicitação.';
    }
    this.mensagemTipo = 'error';
    return throwError(() => error);
  }

  // Métodos para abrir e fechar modal
  openModal() {
    this.modalAberto = true;
    this.mensagem = '';
    this.mensagemTipo = '';
  }

  closeModal() {
    this.modalAberto = false;
  }
}

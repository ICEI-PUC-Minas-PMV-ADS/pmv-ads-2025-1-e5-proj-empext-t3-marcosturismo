import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';


interface Viagem {
  id: string; // UUID da viagem
  motorista: string;
  tipoServico: string;
  dataInicio: string;
  dataVolta: string;
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
  mensagem: string = '';
  mensagemTipo: 'success' | 'error' | '' = '';
  apiUrl: string = `${environment.apiUrl}/viagem`;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadViagens();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('viagens', JSON.stringify(this.viagens));
    }
  }

  loadViagens() {
    this.getViagens().subscribe({
      next: (data: Viagem[]) => {
        this.viagens = data;
        this.mensagem = '';
        this.mensagemTipo = '';
      },
      error: this.handleError.bind(this)
    });
  }

  getViagens(): Observable<Viagem[]> {
    return this.http.get<Viagem[]>(this.apiUrl);
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

    this.http.post(this.apiUrl, novaViagem).subscribe({
      next: (response) => {
        console.log('Viagem incluída no backend:', response);
        this.mensagem = 'Viagem registrada com sucesso!';
        this.mensagemTipo = 'success';
        this.loadViagens();
        this.motorista = '';
        this.tipoServico = 'excursao';
        this.dataInicio = '';
        this.dataVolta = '';
      },
      error: this.handleError.bind(this)
    });
  }

  excluir() {
    if (this.viagens.length === 0) {
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

    this.http.delete(`${this.apiUrl}/${ultimaViagem.id}`).subscribe({
      next: () => {
        console.log('Viagem excluída no backend:', ultimaViagem);
        this.mensagem = 'Viagem excluída com sucesso!';
        this.mensagemTipo = 'success';
        this.viagens = this.viagens.filter(v => v.id !== ultimaViagem.id);
      },
      error: this.handleError.bind(this)
    });
  }

  private handleError(error: HttpErrorResponse) {
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
    console.error('Erro:', error);
    return throwError(() => error);
  }
}
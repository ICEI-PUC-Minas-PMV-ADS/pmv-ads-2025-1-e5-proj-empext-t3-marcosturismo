// src/app/components/viagens/viagens.component.ts

import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment';
import { throwError, Observable } from 'rxjs';

interface Viagem {
  id: string;
  status: 'Finalizada' | 'NaoIniciada' | 'Cancelada' | 'EmAndamento';
  distancia: number;
  valor: number;
  dataInicio: number;
  dataChegada: number;
  enderecoSaida: string;
  enderecoDestino: string;
  tipoViagem: 'Excursao' | 'Fretamento';
  veiculo: string;
  motorista: string;
  cliente: string;
}

interface Veiculo {
  id?: string;
  numeracao: string;
  modelo: string;
  marca: string;
  anoModelo: string;
  kmAtual: number;
  situacao: 'Ativo' | 'Inativo' | 'Manutencao';
  placa: string;
  kmProxTrocaOleo: number;
  kmProxTrocaPneu: number;
  lotacao: number;
  categoria: 'Rodoviario' | 'Urbano';
  arCondicionado: boolean;
  wifi: boolean;
  poltronaReclinavel: boolean;
  tv: boolean;
  geladeira: boolean;
  sanitarios: boolean;
}

interface Resultado {
  veiculo: Veiculo;
  checkList: string;
}

interface Cliente {
  id: string;
  nome: string;
  cpfCnpj: string;
  telefone?: string;
  endereco?: string;
  dataCriacao?: string;
  viagem: Viagem[];
}

interface Usuario {
  id: string;
  nome: string;
  tipo: string;
  email: string;
  status: string;
  telefone?: string;
  categoria?: string;
  documento?: string;
}

@Component({
  selector: 'app-viagens',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './viagens.component.html',
  styleUrls: ['./viagens.component.css']
})
export class ViagensComponent implements OnInit, OnDestroy {
  /** Controle do modal */
  showModalViagem = false;
  editingId: string | null = null;

  /** Campos do formulário de Viagem */
  status: 'Finalizada' | 'NaoIniciada' | 'Cancelada' | 'EmAndamento' = 'NaoIniciada';
  distancia: number | null = null;
  valor: number | null = null;
  dataInicioStr: string = '';
  dataChegadaStr: string = '';
  enderecoSaida: string = '';
  enderecoDestino: string = '';
  tipoViagem: 'Excursao' | 'Fretamento' = 'Excursao';
  veiculoId: string = '';
  motoristaId: string = '';
  clienteId: string = '';

  /** Listas para selects */
  veiculos: Veiculo[] = [];
  loadingVeiculos = false;
  mensagemVeiculos = '';
  mensagemTipoVeiculos: 'success' | 'error' | '' = '';

  clientes: Cliente[] = [];
  errorMsgClientes: string | null = null;

  motoristas: Usuario[] = [];
  loadingMotoristas = false;
  errorMsgMotoristas: string | null = null;

  /** Lista de viagens */
  viagens: Viagem[] = [];
  mensagem: string = '';
  mensagemTipo: 'success' | 'error' | '' = '';

  private apiUrl = `${environment.apiUrl}/viagem`;
  private veiculoUrl = `${environment.apiUrl}/veiculo`;
  private clienteUrl = `${environment.apiUrl}/cliente`;
  private usuarioUrl = `${environment.apiUrl}/usuario`;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private router: Router,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.carregarVeiculos();
      this.carregarClientes();
      this.carregarMotoristas();
      this.loadViagens();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('viagens', JSON.stringify(this.viagens));
    }
  }

  /** Monta headers com Bearer Token */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      this.mensagem = 'Sessão expirada. Faça login novamente.';
      this.mensagemTipo = 'error';
      this.router.navigate(['/login']);
      throw new Error('Token ausente.');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  /** Trata erros HTTP */
  private handleError(error: HttpErrorResponse, action: string): Observable<never> {
    let errorMessage = `Erro ao ${action}.`;
    switch (error.status) {
      case 400:
        errorMessage = error.error || `Dados inválidos ao ${action}.`;
        break;
      case 401:
      case 403:
        errorMessage = 'Acesso negado ou sessão expirada. Faça login novamente.';
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        break;
      case 404:
        errorMessage = 'Recurso não encontrado.';
        break;
      case 500:
        errorMessage = 'Erro interno no servidor. Tente novamente mais tarde.';
        break;
      default:
        if (error.error?.message) {
          errorMessage = error.error.message;
        }
    }
    this.mensagem = errorMessage;
    this.mensagemTipo = 'error';
    return throwError(() => error);
  }

  /** ----- FUNÇÕES DE GET PARA SELECTs ----- */

  /** Carrega motoristas (GET /usuario/motoristas) */
  carregarMotoristas(): void {
    this.loadingMotoristas = true;
    this.errorMsgMotoristas = null;

    this.http
      .get<Usuario[]>(`${this.usuarioUrl}/motoristas`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (data) => {
          this.motoristas = Array.isArray(data) ? data : [];
          this.cdref.detectChanges();
          this.errorMsgMotoristas = null;
        },
        error: (err) => {
          console.error('Erro GET motoristas:', err);
          this.errorMsgMotoristas = 'Erro ao buscar motoristas.';
        },
        complete: () => {
          this.loadingMotoristas = false;
        }
      });
  }

  /** Carrega veículos (GET /veiculo) retornando Resultado[] */
  carregarVeiculos(): void {
    this.loadingVeiculos = true;
    this.mensagemVeiculos = '';
    this.mensagemTipoVeiculos = '';

    this.http
      .get<Resultado[]>(`${this.veiculoUrl}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (data) => {
          const listaResultado = Array.isArray(data) ? data : [];
          this.veiculos = listaResultado.map((r) => r.veiculo);
          if (this.veiculos.length === 0) {
            this.mensagemVeiculos = 'Nenhum veículo encontrado.';
            this.mensagemTipoVeiculos = 'error';
          }
        },
        error: (error) => {
          if (error.status === 204) {
            this.veiculos = [];
            this.mensagemVeiculos = 'Nenhum veículo encontrado.';
            this.mensagemTipoVeiculos = 'error';
          } else {
            console.error('Erro ao carregar veículos:', error);
            this.mensagemVeiculos = 'Erro ao carregar veículos.';
            this.mensagemTipoVeiculos = 'error';
          }
        },
        complete: () => {
          this.loadingVeiculos = false;
        }
      });
  }

  /** Carrega clientes (GET /cliente) */
  carregarClientes(): void {
    this.http
      .get<Cliente[]>(`${this.clienteUrl}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (data) => {
          this.clientes = Array.isArray(data) ? data : [];
          this.cdref.detectChanges();
          this.errorMsgClientes = null;
        },
        error: (err) => {
          console.error('Erro GET clientes:', err);
          this.errorMsgClientes = 'Erro ao buscar clientes.';
        }
      });
  }

  /** ----- CRUD DE VIAGENS ----- */

  private loadViagens(): void {
    this.http
      .get<Viagem[]>(this.apiUrl, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (data) => {
          this.viagens = Array.isArray(data) ? data : [];
          this.mensagem = '';
          this.mensagemTipo = '';
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao carregar viagens:', err);
          this.handleError(err, 'carregar viagens');
        }
      });
  }

  private buildViagemFromForm(): any {
    return {
      status: this.status,
      distancia: this.distancia!,
      valor: this.valor!,
      dataInicio: new Date(this.dataInicioStr).getTime(),
      dataChegada: new Date(this.dataChegadaStr).getTime(),
      enderecoSaida: this.enderecoSaida,
      enderecoDestino: this.enderecoDestino,
      tipoViagem: this.tipoViagem,
      veiculo: this.veiculoId,
      motorista: this.motoristaId,
      cliente: this.clienteId
    };
  }

  private clearForm(): void {
    this.status = 'NaoIniciada';
    this.distancia = null;
    this.valor = null;
    this.dataInicioStr = '';
    this.dataChegadaStr = '';
    this.enderecoSaida = '';
    this.enderecoDestino = '';
    this.tipoViagem = 'Excursao';
    this.veiculoId = '';
    this.motoristaId = '';
    this.clienteId = '';
    this.editingId = null;
    this.mensagem = '';
    this.mensagemTipo = '';
  }

  /** Abre modal de cadastro/edição */
  openModal(): void {
    this.clearForm();
    this.showModalViagem = true;
  }

  /** Fecha modal */
  closeModal(): void {
    this.showModalViagem = false;
    this.clearForm();
  }

  /** Salva nova viagem (POST) ou atualiza existente (PUT) */
  salvarViagem(): void {
    if (
      !this.motoristaId ||
      !this.clienteId ||
      !this.veiculoId ||
      !this.dataInicioStr ||
      !this.dataChegadaStr ||
      this.distancia === null ||
      this.valor === null ||
      !this.enderecoSaida ||
      !this.enderecoDestino
    ) {
      this.mensagem = 'Por favor, preencha todos os campos obrigatórios!';
      this.mensagemTipo = 'error';
      return;
    }

    const body = this.buildViagemFromForm();

    if (this.editingId) {
      this.http
        .put<string>(`${this.apiUrl}/${this.editingId}`, body, { headers: this.getAuthHeaders() })
        .subscribe({
          next: (res) => {
            this.mensagem = 'Viagem atualizada com sucesso!';
            this.mensagemTipo = 'success';
            this.loadViagens();
            this.closeModal();
          },
          error: (err: HttpErrorResponse) => {
            console.error('Erro ao atualizar viagem:', err);
            this.handleError(err, 'atualizar viagem');
          }
        });
    } else {
      this.http
        .post<string>(this.apiUrl, body, { headers: this.getAuthHeaders() })
        .subscribe({
          next: (res) => {
            this.mensagem = 'Viagem registrada com sucesso!';
            this.mensagemTipo = 'success';
            this.loadViagens();
            this.closeModal();
          },
          error: (err: HttpErrorResponse) => {
            console.error('Erro ao criar viagem:', err);
            this.handleError(err, 'registrar viagem');
          }
        });
    }
  }

  /** Preenche o formulário para edição e abre modal */
  editarViagem(viagem: Viagem): void {
    this.editingId = viagem.id;
    this.status = viagem.status;
    this.distancia = viagem.distancia;
    this.valor = viagem.valor;
    this.dataInicioStr = new Date(viagem.dataInicio).toISOString().substring(0, 10);
    this.dataChegadaStr = new Date(viagem.dataChegada).toISOString().substring(0, 10);
    this.enderecoSaida = viagem.enderecoSaida;
    this.enderecoDestino = viagem.enderecoDestino;
    this.tipoViagem = viagem.tipoViagem;
    this.veiculoId = viagem.veiculo;
    this.motoristaId = viagem.motorista;
    this.clienteId = viagem.cliente;
    this.showModalViagem = true;
  }

  /** Exclui a última viagem cadastrada */
  excluirUltimaViagem(): void {
    if (!this.viagens.length) {
      this.mensagem = 'Não há viagens para excluir.';
      this.mensagemTipo = 'error';
      return;
    }
    const ultima = this.viagens[this.viagens.length - 1];
    this.http
      .delete<string>(`${this.apiUrl}/${ultima.id}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (res) => {
          this.mensagem = res || 'Viagem excluída com sucesso!';
          this.mensagemTipo = 'success';
          this.loadViagens();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao excluir viagem:', err);
          this.handleError(err, 'excluir viagem');
        }
      });
  }

  /** Inicia viagem */
  iniciarViagem(id: string): void {
    this.http
      .put<string>(`${this.apiUrl}/iniciar/${id}`, null, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (res) => {
          this.mensagem = res;
          this.mensagemTipo = 'success';
          this.loadViagens();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao iniciar viagem:', err);
          this.handleError(err, 'iniciar viagem');
        }
      });
  }

  /** Finaliza viagem */
  finalizarViagem(id: string, km: number): void {
    this.http
      .put<string>(`${this.apiUrl}/finalizar/${id}?km=${km}`, null, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (res) => {
          this.mensagem = res;
          this.mensagemTipo = 'success';
          this.loadViagens();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao finalizar viagem:', err);
          this.handleError(err, 'finalizar viagem');
        }
      });
  }

  /** Cancela viagem */
  cancelarViagem(id: string): void {
    this.http
      .put<string>(`${this.apiUrl}/cancelar/${id}`, null, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (res) => {
          this.mensagem = res;
          this.mensagemTipo = 'success';
          this.loadViagens();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao cancelar viagem:', err);
          this.handleError(err, 'cancelar viagem');
        }
      });
  }

  /** Cria checklist */
  criarChecklist(id: string, checklistData: any): void {
    this.http
      .post<string>(`${this.apiUrl}/checklist/${id}`, checklistData, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (res) => {
          this.mensagem = res;
          this.mensagemTipo = 'success';
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao criar checklist:', err);
          this.handleError(err, 'criar checklist');
        }
      });
  }
}

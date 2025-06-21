import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { Router } from '@angular/router';

// Interfaces ajustadas
interface TipoServico {
  id: string;
  descricao: string;
  dataCriacao: string;
}

interface ServicoRealizadoDTO {
  tipoServicoId: string;
  custo: number;
}

interface VeiculoDTO {
  id: string;
  numeracao: string;
  modelo: string;
  marca: string;
  anoModelo: string;
  kmAtual: number;
  situacao: string;
  kmProxTrocaOleo: number;
  kmProxTrocaPneu: number;
}

interface ServicoAPIResponse {
  id: string;
  dataServico: string;
  kmVeiculo: number;
  descricao: string;
  dataCriacao: string;
  veiculo: VeiculoDTO;
  responsavel: any;
  custoTotal: number;
  servicosRealizados: Array<{
    id: string;
    tipoServico: { id: string; descricao: string; dataCriacao: string };
    custo: number;
    dataCriacao: string;
  }>;
}

interface Servico {
  id?: string;
  dataServico: string;
  kmVeiculo: number;
  kmProxTrocaOleo: number;
  kmProxTrocaPneu: number;
  descricao: string;
  veiculoId: string;
  veiculoNumeracao: string;
  servicosRealizados: ServicoRealizadoDTO[];
  custoTotal?: number;
}

interface Veiculo {
  id: string;
  numeracao: string;
  modelo: string;
}

interface ResultadoVeiculo {
  veiculo: Veiculo;
  checkList: null;
}

@Component({
  selector: 'app-servico',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    SidebarComponent,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [provideNgxMask()],
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {
  private baseUrl = `${environment.apiUrl}/servico`;
  private tipoUrl = `${environment.apiUrl}/servico/tipo_servico`;
  private veiculoUrl = `${environment.apiUrl}/veiculo`;

  servicos: Servico[] = [];
  tipos: TipoServico[] = [];
  veiculos: ResultadoVeiculo[] = [];
  showModal = false;
  errorMsg: string | null = null;

  servicoForm: Partial<Servico> = {
    dataServico: '',
    kmVeiculo: 0,
    kmProxTrocaOleo: 0,
    kmProxTrocaPneu: 0,
    descricao: '',
    veiculoId: '',
    servicosRealizados: []
  };

  constructor(
    private http: HttpClient,
    private cdref: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarServicos();
    this.carregarTipos();
    this.carregarVeiculos();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMsg = 'Sessão expirada. Faça login novamente.';
      this.router.navigate(['/login']).then(() => {
        throw new Error('Token ausente.');
      });
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  carregarServicos(): void {
    this.http
      .get<ServicoAPIResponse[]>(this.baseUrl, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (dataApi) => {
          this.servicos = dataApi.map((s) => ({
            id: s.id,
            dataServico: s.dataServico,
            kmVeiculo: s.kmVeiculo,
            kmProxTrocaOleo: s.veiculo.kmProxTrocaOleo,
            kmProxTrocaPneu: s.veiculo.kmProxTrocaPneu,
            descricao: s.descricao,
            veiculoId: s.veiculo.id,
            veiculoNumeracao: s.veiculo.numeracao,
            servicosRealizados: s.servicosRealizados.map((r) => ({
              tipoServicoId: r.tipoServico.id,
              custo: r.custo
            })),
            custoTotal: s.custoTotal
          }));
          this.cdref.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao buscar serviços:', err);
          this.errorMsg = err.status === 403
            ? 'Você não tem permissão para acessar os serviços.'
            : err.error?.message || 'Erro ao buscar serviços';
        }
      });
  }

  carregarTipos(): void {
    this.http
      .get<TipoServico[]>(this.tipoUrl, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (data) => {
          this.tipos = data;
        },
        error: (err) => {
          console.error('Erro ao buscar tipos de serviço:', err);
          this.errorMsg = err.status === 403
            ? 'Você não tem permissão para acessar os tipos de serviço.'
            : err.error?.message || 'Erro ao buscar tipos de serviço';
        }
      });
  }

  carregarVeiculos(): void {
    this.http
      .get<ResultadoVeiculo[]>(this.veiculoUrl, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (data) => {
          this.veiculos = data;
        },
        error: (err) => {
          console.error('Erro ao buscar veículos:', err);
          this.errorMsg = err.error?.message || 'Erro ao buscar veículos';
        }
      });
  }

  addRealizado(): void {
    const novoRealizado: ServicoRealizadoDTO = {
      tipoServicoId: this.tipos[0]?.id || '',
      custo: 0
    };
    this.servicoForm.servicosRealizados?.push(novoRealizado);
  }

  removeRealizado(index: number): void {
    if (this.servicoForm.servicosRealizados) {
      this.servicoForm.servicosRealizados.splice(index, 1);
    }
  }

  openModal(): void {
    this.showModal = true;
    this.clearForm();
  }

  closeModal(): void {
    this.showModal = false;
    this.clearForm();
  }

  private clearForm(): void {
    this.servicoForm = {
      dataServico: '',
      kmVeiculo: 0,
      kmProxTrocaOleo: 0,
      kmProxTrocaPneu: 0,
      descricao: '',
      veiculoId: '',
      servicosRealizados: []
    };
    this.errorMsg = null;
  }

  validarFormulario(): boolean {
    if (
      !this.servicoForm.dataServico ||
      !this.servicoForm.kmVeiculo ||
      !this.servicoForm.veiculoId
    ) {
      this.errorMsg = 'Por favor, preencha todos os campos obrigatórios.';
      return false;
    }
    if ((this.servicoForm.servicosRealizados?.length || 0) === 0) {
      this.errorMsg = 'Por favor, adicione pelo menos um tipo de serviço realizado.';
      return false;
    }
    return true;
  }

  salvar(): void {
    this.errorMsg = null;
    if (!this.validarFormulario()) {
      return;
    }

    const payload = {
      dataServico: this.servicoForm.dataServico,
      kmVeiculo: this.servicoForm.kmVeiculo,
      kmProxTrocaOleo: this.servicoForm.kmProxTrocaOleo,
      kmProxTrocaPneu: this.servicoForm.kmProxTrocaPneu,
      descricao: this.servicoForm.descricao,
      veiculoId: this.servicoForm.veiculoId,
      servicosRealizados: this.servicoForm.servicosRealizados
    };

    this.adicionarServico(payload);
  }

  private adicionarServico(payload: any): void {
    this.http
      .post(this.baseUrl, payload, { headers: this.getAuthHeaders(), responseType: 'text' as const })
      .subscribe({
        next: () => {
          this.carregarServicos();
          this.closeModal();
        },
        error: (err) => {
          console.error('Erro ao adicionar serviço:', err);
          this.errorMsg = err.error?.message || 'Erro ao adicionar serviço';
        }
      });
  }

  excluirServico(id: string): void {
    if (confirm('Você tem certeza que deseja excluir este serviço?')) {
      this.http
        .delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders(), responseType: 'text' as const })
        .subscribe({
          next: () => {
            this.carregarServicos();
          },
          error: (err) => {
            console.error('Erro ao excluir serviço:', err);
            this.errorMsg = err.error?.message || 'Erro ao excluir serviço';
          }
        });
    }
  }

  getDescricaoTipoServico(tipoServicoId: string): string {
    const tipoServico = this.tipos.find((t) => t.id === tipoServicoId);
    return tipoServico ? tipoServico.descricao : 'Descrição não encontrada';
  }
}
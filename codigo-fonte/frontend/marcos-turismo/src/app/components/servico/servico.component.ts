/* servico.component.ts */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

interface TipoServico {
  id: string;
  descricao: string;
  dataCriacao: string;
}

interface Veiculo {
  id: string;
  numeracao: string;
  modelo: string;
}

interface ServicoRealizado {
  tipoServicoId: string;
  custo: number;
}

interface Servico {
  id?: string;
  dataServico: string;
  kmVeiculo: number;
  kmProxTrocaOleo: number;
  kmProxTrocaPneu: number;
  descricao: string;
  veiculoId: string;
  servicosRealizados: ServicoRealizado[];
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
  private veiculoUrl = `${environment.apiUrl}/frota`;

  servicos: Servico[] = [];
  tipos: TipoServico[] = [];
  veiculos: Veiculo[] = [];
  showModal = false;
  errorMsg: string | null = null;
  editingId: string | null = null;

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
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarServicos();
    this.carregarTipos();
    this.carregarVeiculos();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) alert('Token não encontrado!');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  carregarServicos(): void {
    this.http.get<Servico[]>(this.baseUrl, { headers: this.getAuthHeaders() })
      .subscribe({
        next: data => {
          this.servicos = Array.isArray(data) ? data : [];
          this.cdref.detectChanges();
          this.errorMsg = null;
        },
        error: err => {
          console.error('Erro ao buscar serviços:', err);
          this.errorMsg = err.error?.message || 'Erro ao buscar serviço.';
        }
      });
  }

  carregarTipos(): void {
    this.http.get<TipoServico[]>(this.tipoUrl, { headers: this.getAuthHeaders() })
      .subscribe({
        next: data => this.tipos = Array.isArray(data) ? data : [],
        error: err => console.error('Erro ao buscar tipos de serviço:', err)
      });
  }

  carregarVeiculos(): void {
    this.http.get<Veiculo[]>(this.veiculoUrl, { headers: this.getAuthHeaders() })
      .subscribe({
        next: data => this.veiculos = Array.isArray(data) ? data : [],
        error: err => console.error('Erro ao buscar veículos:', err)
      });
  }

  openModal(edit = false, servico?: Servico): void {
    this.showModal = true;
    if (edit && servico) {
      this.editingId = servico.id!;
      this.servicoForm = { ...servico };
    } else {
      this.editingId = null;
      this.clearForm();
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.editingId = null;
    this.clearForm();
  }

  addRealizado(): void {
    (this.servicoForm.servicosRealizados ||= []).push({ tipoServicoId: this.tipos[0]?.id || '', custo: 0 });
  }

  removeRealizado(index: number): void {
    this.servicoForm.servicosRealizados?.splice(index, 1);
  }

  salvar(): void {
    const body = {
      dataServico: this.servicoForm.dataServico,
      kmVeiculo: Number(this.servicoForm.kmVeiculo),
      kmProxTrocaOleo: Number(this.servicoForm.kmProxTrocaOleo),
      kmProxTrocaPneu: Number(this.servicoForm.kmProxTrocaPneu),
      descricao: this.servicoForm.descricao,
      veiculoId: this.servicoForm.veiculoId,
      servicosRealizados: this.servicoForm.servicosRealizados?.map(r => ({
        tipoServicoId: r.tipoServicoId,
        custo: Number(r.custo)
      }))
    };

    const request$ = this.editingId
      ? this.http.put(`${this.baseUrl}/${this.editingId}`, body, { headers: this.getAuthHeaders() })
      : this.http.post(this.baseUrl, body, { headers: this.getAuthHeaders() });

    request$.subscribe({
      next: () => {
        this.carregarServicos();
        this.closeModal();
        this.errorMsg = null;
      },
      error: err => {
        console.error('Falha ao salvar serviço:', err);
        this.errorMsg = err.error?.message || 'Erro ao registrar serviço.';
      }
    });
  }

  editarServico(s: Servico): void {
    this.openModal(true, s);
  }

  excluirServico(id: string): void {
    this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    }).subscribe({
      next: () => {
        this.carregarServicos();
        this.errorMsg = null;
      },
      error: err => {
        console.error('Erro ao excluir serviço:', err);
        this.errorMsg = err.error?.message || 'Erro ao excluir serviço.';
      }
    });
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
  }
}

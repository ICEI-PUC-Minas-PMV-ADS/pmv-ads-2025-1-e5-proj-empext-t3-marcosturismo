import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { Router } from '@angular/router'; // Importação do Router

// Interfaces
interface TipoServico {
  id: string;
  descricao: string;
  dataCriacao: string;
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
  // URLs de API
  private baseUrl = `${environment.apiUrl}/servico`;
  private tipoUrl = `${environment.apiUrl}/servico/tipo_servico`;
  private veiculoUrl = `${environment.apiUrl}/veiculo`;

  // Propriedades de dados
  servicos: Servico[] = [];
  tipos: TipoServico[] = [];
  veiculos: ResultadoVeiculo[] = [];

  // Modal e erro
  showModal = false;
  errorMsg: string | null = null;
  editingId: string | null = null;

  // Mensagem de erro e tipo de mensagem
  mensagemTipo?: string;

  // Formulário
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
  ) {}

  ngOnInit(): void {
    this.carregarServicos();
    this.carregarTipos();
    this.carregarVeiculos();
  }

  // Cabeçalhos de autenticação
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      this.mensagemTipo = 'error';
      this.errorMsg = 'Sessão expirada. Faça login novamente.';
      console.log(this.errorMsg);
      this.router.navigate(['/login']).then(() => {
        // Impede qualquer outra ação no código após o redirecionamento
        throw new Error('Token ausente.');
      });
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Métodos de carregamento de dados
  carregarServicos(): void {
    this.http.get<Servico[]>(this.baseUrl, { headers: this.getAuthHeaders() })
      .subscribe({
        next: data => {
          this.servicos = data;
          this.cdref.detectChanges();
        },
        error: err => {
          console.error('Erro ao buscar serviços:', err);
          if (err.status === 403) {
            this.errorMsg = 'Você não tem permissão para acessar os serviços.';
          } else {
            this.errorMsg = err.error?.message || 'Erro ao buscar serviços';
          }
        }
      });
  }

  carregarTipos(): void {
    this.http.get<TipoServico[]>(this.tipoUrl, { headers: this.getAuthHeaders() })
      .subscribe({
        next: data => {
          this.tipos = data;
        },
        error: err => {
          console.error('Erro ao buscar tipos de serviço:', err);
          if (err.status === 403) {
            this.errorMsg = 'Você não tem permissão para acessar os tipos de serviço.';
          } else {
            this.errorMsg = err.error?.message || 'Erro ao buscar tipos de serviço';
          }
        }
      });
  }

  carregarVeiculos(): void {
    this.http.get<ResultadoVeiculo[]>(this.veiculoUrl, { headers: this.getAuthHeaders() })
      .subscribe({
        next: data => {
          this.veiculos = data;
        },
        error: err => {
          console.error('Erro ao buscar veículos:', err);
          this.errorMsg = err.error?.message || 'Erro ao buscar veículos';
        }
      });
  }

  // Métodos de manipulação de serviços realizados
  addRealizado(): void {
    const novoRealizado: ServicoRealizado = {
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

  // Métodos de modal
  openModal(edit = false, servico?: Servico): void {
    this.showModal = true;
    if (edit && servico) {
      this.editingId = servico.id ?? null;
      this.servicoForm = { ...servico };
    } else {
      this.editingId = null;
      this.clearForm();
    }
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
  }

  // Método de validação do formulário
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

  // Método para salvar ou atualizar o serviço
  salvar(): void {
    this.errorMsg = null; // limpa mensagem anterior
    if (this.validarFormulario()) {
      if (this.editingId) {
        this.atualizarServico();
      } else {
        this.adicionarServico();
      }
    }
  }

  // Método para atualizar um serviço
  private atualizarServico(): void {
    this.http
      .put<Servico>(`${this.baseUrl}/${this.editingId}`, this.servicoForm, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (updatedServico) => {
          // Atualiza o serviço na lista localmente
          const index = this.servicos.findIndex(servico => servico.id === this.editingId);
          if (index !== -1) {
            this.servicos[index] = { ...updatedServico };
          }
          this.closeModal();  // Fecha o modal após a atualização
        },
        error: (err) => {
          console.error('Erro ao atualizar serviço:', err);
          this.errorMsg = err.error?.message || 'Erro ao atualizar serviço';
        }
      });
  }

  // Método para adicionar um serviço
  private adicionarServico(): void {
    this.http
      .post<Servico>(this.baseUrl, this.servicoForm, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (novoServico) => {
          // Adiciona o novo serviço à lista localmente
          this.servicos.push(novoServico);
          this.closeModal();  // Fecha o modal após a adição
        },
        error: (err) => {
          console.error('Erro ao adicionar serviço:', err);
          this.errorMsg = err.error?.message || 'Erro ao adicionar serviço';
        }
      });
  }

  // Método para excluir um serviço
  excluirServico(id: string): void {
    if (confirm('Você tem certeza que deseja excluir este serviço?')) {
      this.http
        .delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() })
        .subscribe({
          next: () => {
            // Remove o serviço da lista localmente após a exclusão
            this.servicos = this.servicos.filter(servico => servico.id !== id);
            this.cdref.detectChanges();  // Atualiza a tela
          },
          error: (err) => {
            console.error('Erro ao excluir serviço:', err);
            this.errorMsg = err.error?.message || 'Erro ao excluir serviço';
          }
        });
    }
  }

  // Método para editar o serviço
  editarServico(servico: Servico): void {
    this.openModal(true, servico);
  }

  // Função de descrição de tipo de serviço
  getDescricaoTipoServico(tipoServicoId: string): string {
    const tipoServico = this.tipos.find(t => t.id === tipoServicoId);
    return tipoServico ? tipoServico.descricao : 'Descrição não encontrada';
  }
}

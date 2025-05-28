import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment';

interface Veiculo {
  id?: string;
  numeracao: string;
  modelo: string;
  marca: string;
  anoModelo: string;
  kmAtual: number;
  situacao: 'Ativo' | 'Inativo' | 'Manutencao';
  placa: string;
  kmProxTrocaOleo?: number | null;
  kmProxTrocaPneu?: number | null;
  lotacao: number;
  categoria: 'Rodoviario' | 'Urbano';
  arCondicionado: boolean;
  wifi: boolean;
  poltronaReclinavel: boolean;
  tv: boolean;
  geladeira: boolean;
  sanitarios: boolean;
  // Por enquanto não enviamos nem recebemos imagens
}

interface Resultado {
  veiculo: Veiculo;
  checkList: string;
}

@Component({
  selector: 'app-frota',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './frota.component.html',
  styleUrls: ['./frota.component.css']
})
export class FrotaComponent implements OnInit {
  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef<HTMLInputElement>>;

  modalAberto = false;
  selectedCardIndex: number | null = null;
  mensagem = '';
  mensagemTipo: 'success' | 'error' | '' = '';
  mensagemErro: string | null = null;

  // Campos do formulário
  numeracao = '';
  modelo = '';
  marca = '';
  anoModelo = '';
  kmAtual: number | null = null;
  situacao: 'Ativo' | 'Inativo' | 'Manutencao' = 'Ativo';
  placa = '';
  kmProxTrocaOleo: number | null = null;
  kmProxTrocaPneu: number | null = null;
  lotacao: number | null = null;
  categoria: 'Rodoviario' | 'Urbano' = 'Rodoviario';
  arCondicionado = false;
  wifi = false;
  poltronaReclinavel = false;
  tv = false;
  geladeira = false;
  sanitarios = false;

  cardsGerados: Resultado[] = [];
  loading = false;

  private apiUrl = `${environment.apiUrl}/veiculo`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarFrota();
  }

  /**
   * Retorna HttpHeaders com Authorization: Bearer <token>.
   * Se não houver token, devolve null.
   */
  private getAuthHeaders(): HttpHeaders | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  /**
   * Carrega todos os veículos da API.
   */
  carregarFrota(): void {
    this.loading = true;
    const headers = this.getAuthHeaders();
    if (!headers) {
      this.mensagem = 'Sessão expirada. Faça login novamente.';
      this.mensagemTipo = 'error';
      this.loading = false;
      return;
    }

    this.http.get<Resultado[]>(this.apiUrl, { headers }).subscribe({
      next: (data) => {
        this.cardsGerados = data;
        if (this.cardsGerados.length === 0) {
          this.mensagem = 'Nenhum veículo encontrado.';
          this.mensagemTipo = 'error';
        }
      },
      error: (error) => this.handleError(error, 'carregar frota'),
      complete: () => {
        this.loading = false;
        this.cdref.detectChanges();
      }
    });
  }

  /**
   * Abre o modal para edição e pré‐preenche o formulário.
   */
  editarCard(index: number): void {
    const veic = this.cardsGerados[index].veiculo;
    this.numeracao = veic.numeracao;
    this.modelo = veic.modelo;
    this.marca = veic.marca;
    this.anoModelo = veic.anoModelo;
    this.kmAtual = veic.kmAtual;
    this.situacao = veic.situacao;
    this.placa = veic.placa;
    this.kmProxTrocaOleo = veic.kmProxTrocaOleo ?? null;
    this.kmProxTrocaPneu = veic.kmProxTrocaPneu ?? null;
    this.lotacao = veic.lotacao;
    this.categoria = veic.categoria;
    this.arCondicionado = veic.arCondicionado;
    this.wifi = veic.wifi;
    this.poltronaReclinavel = veic.poltronaReclinavel;
    this.tv = veic.tv;
    this.geladeira = veic.geladeira;
    this.sanitarios = veic.sanitarios;

    this.selectedCardIndex = index;
    this.modalAberto = true;
  }

  /**
   * Fecha o modal e reseta todos os campos.
   */
  fecharModal(): void {
    this.modalAberto = false;
    this.selectedCardIndex = null;
    this.numeracao = '';
    this.modelo = '';
    this.marca = '';
    this.anoModelo = '';
    this.kmAtual = null;
    this.situacao = 'Ativo';
    this.placa = '';
    this.kmProxTrocaOleo = null;
    this.kmProxTrocaPneu = null;
    this.lotacao = null;
    this.categoria = 'Rodoviario';
    this.arCondicionado = false;
    this.wifi = false;
    this.poltronaReclinavel = false;
    this.tv = false;
    this.geladeira = false;
    this.sanitarios = false;
    this.mensagem = '';
    this.mensagemTipo = '';
  }

  /**
   * Chamado pelo botão “Salvar”. Decide entre criar (POST) ou editar (PUT).
   */
  adicionarCard(): void {
    if (!this.validaFormulario()) return;
    this.loading = true;

    const veiculoForm: Veiculo = {
      numeracao: this.numeracao,
      modelo: this.modelo,
      marca: this.marca,
      anoModelo: this.anoModelo,
      kmAtual: this.kmAtual as number,
      situacao: this.situacao,
      placa: this.placa,
      kmProxTrocaOleo: this.kmProxTrocaOleo,
      kmProxTrocaPneu: this.kmProxTrocaPneu,
      lotacao: this.lotacao as number,
      categoria: this.categoria,
      arCondicionado: this.arCondicionado,
      wifi: this.wifi,
      poltronaReclinavel: this.poltronaReclinavel,
      tv: this.tv,
      geladeira: this.geladeira,
      sanitarios: this.sanitarios
      // sem campos de imagem
    };

    const headers = this.getAuthHeaders();
    if (!headers) {
      this.mensagem = 'Sessão expirada. Faça login novamente.';
      this.mensagemTipo = 'error';
      this.loading = false;
      return;
    }

    if (this.selectedCardIndex !== null) {
      const existente = this.cardsGerados[this.selectedCardIndex].veiculo;
      if (!existente.id) {
        this.mensagem = 'Erro: ID do veículo não encontrado.';
        this.mensagemTipo = 'error';
        this.loading = false;
        return;
      }
      veiculoForm.id = existente.id;
      this.atualizarVeiculo(existente.id, veiculoForm, headers);
    } else {
      this.criarVeiculo(veiculoForm, headers);
    }
  }

  /**
   * POST /veiculo — envia JSON puro para criar novo veículo.
   */
  criarVeiculo(veiculo: Veiculo, headers: HttpHeaders): void {
    this.http.post<Veiculo>(this.apiUrl, veiculo, { headers }).subscribe({
      next: () => {
        this.mensagem = 'Veículo adicionado com sucesso!';
        this.mensagemTipo = 'success';
        this.carregarFrota();
        this.fecharModal();
      },
      error: (error) => this.handleError(error, 'adicionar veículo'),
      complete: () => (this.loading = false)
    });
  }

  /**
   * PUT /veiculo/{id} — envia JSON puro para atualizar veículo.
   */
  atualizarVeiculo(id: string, veiculo: Veiculo, headers: HttpHeaders): void {
    this.http.put<Veiculo>(`${this.apiUrl}/${id}`, veiculo, { headers }).subscribe({
      next: () => {
        this.mensagem = 'Veículo atualizado com sucesso!';
        this.mensagemTipo = 'success';
        this.carregarFrota();
        this.fecharModal();
      },
      error: (error) => this.handleError(error, 'atualizar veículo'),
      complete: () => (this.loading = false)
    });
  }

  /**
   * DELETE /veiculo/{id} — remove o veículo.
   */
  excluirCard(index: number): void {
    const headers = this.getAuthHeaders();
    if (!headers) {
      this.mensagem = 'Sessão expirada. Faça login novamente.';
      this.mensagemTipo = 'error';
      return;
    }
    const veic = this.cardsGerados[index].veiculo;
    if (!veic.id) {
      this.mensagem = 'Erro: Veículo não possui ID válido.';
      this.mensagemTipo = 'error';
      return;
    }
    const confirmacao = window.confirm(
      `Tem certeza que deseja excluir o veículo ${veic.numeracao}?`
    );
    if (!confirmacao) return;

    this.loading = true;
    this.http.delete(`${this.apiUrl}/${veic.id}`, { headers, responseType: 'text' }).subscribe({
      next: (response) => {
        this.mensagem = response || 'Veículo excluído com sucesso!';
        this.mensagemTipo = 'success';
        this.carregarFrota();
      },
      error: (error) => this.handleError(error, 'excluir veículo'),
      complete: () => (this.loading = false)
    });
  }

  /**
   * Validação básica dos campos obrigatórios.
   */
  validaFormulario(): boolean {
    this.mensagem = '';
    this.mensagemTipo = '';
    if (
      !this.numeracao ||
      !this.modelo ||
      !this.marca ||
      !this.anoModelo ||
      this.kmAtual == null ||
      !this.placa ||
      this.lotacao == null
    ) {
      this.mensagem = 'Por favor, preencha todos os campos obrigatórios.';
      this.mensagemTipo = 'error';
      return false;
    }
    if (this.placa.length !== 7) {
      this.mensagem = 'A placa deve ter exatamente 7 caracteres.';
      this.mensagemTipo = 'error';
      return false;
    }
    if (this.kmAtual < 0) {
      this.mensagem = 'A quilometragem atual não pode ser negativa.';
      this.mensagemTipo = 'error';
      return false;
    }
    if (this.lotacao <= 0) {
      this.mensagem = 'A lotação deve ser positiva.';
      this.mensagemTipo = 'error';
      return false;
    }
    return true;
  }

  /**
   * Trata erros HTTP. Se 401/403, remove token e redireciona para login.
   */
  private handleError(error: any, action: string): void {
    console.error(`${action} falhou:`, error);
    let errorMessage = `Erro ao ${action}. Tente novamente mais tarde.`;

    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem('token');
      this.mensagem = 'Sessão expirada. Faça login novamente.';
      this.mensagemTipo = 'error';
      this.router.navigate(['/login']);
      return;
    }

    if (error.status === 400 && error.error) {
      if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else {
        errorMessage = Object.values(error.error).join('; ');
      }
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }

    this.mensagem = errorMessage;
    this.mensagemTipo = 'error';
    this.loading = false;
  }
}
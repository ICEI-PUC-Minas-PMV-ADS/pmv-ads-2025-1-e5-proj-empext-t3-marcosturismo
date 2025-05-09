import { config } from './../../app.config.server';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment';
import { Observable, catchError } from 'rxjs';
import { error } from 'console';

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
  //imagem: string;
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
  modalAberto = false;
  selectedCardIndex: number | null = null;
  mensagem = '';
  mensagemTipo: 'success' | 'error' | '' = '';
  errorMsg: string | null = null;

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
  imagemPreview = '';

  cardsGerados: Resultado[] = [];
  loading = false;

  private apiUrl = `${environment.apiUrl}/veiculo`;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.carregarFrota();
  }

  /**
   * Seleciona uma imagem para upload e atualiza a pré-visualização.
   */
  selecionarImagem(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Preenche o formulário com os dados de um veículo para edição.
   */
  editarCard(index: number): void {
    const veiculo = this.cardsGerados[index].veiculo;
    this.numeracao = veiculo.numeracao;
    this.modelo = veiculo.modelo;
    this.marca = veiculo.marca;
    this.anoModelo = veiculo.anoModelo;
    this.kmAtual = veiculo.kmAtual;
    this.situacao = veiculo.situacao;
    this.placa = veiculo.placa;
    this.kmProxTrocaOleo = veiculo.kmProxTrocaOleo;
    this.kmProxTrocaPneu = veiculo.kmProxTrocaPneu;
    this.lotacao = veiculo.lotacao;
    this.categoria = veiculo.categoria;
    this.arCondicionado = veiculo.arCondicionado;
    this.wifi = veiculo.wifi;
    this.poltronaReclinavel = veiculo.poltronaReclinavel;
    this.tv = veiculo.tv;
    this.geladeira = veiculo.geladeira;
    this.sanitarios = veiculo.sanitarios;
    //this.imagemPreview = veiculo.imagem;
    this.selectedCardIndex = index;
    this.modalAberto = true;
  }

  /**
   * Adiciona ou atualiza um veículo com base no estado do formulário.
   */
  adicionarCard(): void {
    if (this.validaFormulario()) {
      this.loading = true;
      const veiculo: Veiculo = {
        numeracao: this.numeracao,
        modelo: this.modelo,
        marca: this.marca,
        anoModelo: this.anoModelo,
        kmAtual: this.kmAtual as number,
        situacao: this.situacao,
        placa: this.placa,
        kmProxTrocaOleo: this.kmProxTrocaOleo ?? 0, 
        kmProxTrocaPneu: this.kmProxTrocaPneu ?? 0,
        lotacao: this.lotacao as number,
        categoria: this.categoria,
        arCondicionado: this.arCondicionado,
        wifi: this.wifi,
        poltronaReclinavel: this.poltronaReclinavel,
        tv: this.tv,
        geladeira: this.geladeira,
        sanitarios: this.sanitarios,
        //imagem: this.imagemPreview
      };

      if (this.selectedCardIndex !== null) {
        const id = this.cardsGerados[this.selectedCardIndex].veiculo.id;
        if (id) {
          this.atualizarVeiculo(id, veiculo);
        } else {
          console.error('ID do veículo não encontrado para atualização');
          this.loading = false;
          this.mensagem = 'Erro: ID do veículo não encontrado.';
          this.mensagemTipo = 'error';
        }
      } else {
        this.criarVeiculo(veiculo);
      }
    }
  }

  /**
   * Exclui um veículo da frota.
   */
  excluirCard(index: number): void {
    const veiculo = this.cardsGerados[index].veiculo;
    if (veiculo.id) {
      const confirmacao = window.confirm(`Tem certeza que deseja excluir o veículo ${veiculo.numeracao}?`);
      if (confirmacao) {
        this.loading = true;
        this.http
          .delete(`${this.apiUrl}/${veiculo.id}`, {
            headers: this.getAuthHeaders(),
            responseType: 'text'
          })
          .subscribe({
            next: (response) => {
              this.mensagem = response || 'Veículo excluído com sucesso!';
              this.mensagemTipo = 'success';
              this.carregarFrota();
            },
            error: (error) => this.handleError(error, 'excluir veículo'),
            complete: () => (this.loading = false)
          });
      }
    } else {
      this.mensagem = 'Erro: Veículo não possui ID válido.';
      this.mensagemTipo = 'error';
    }
  }

  /**
   * Fecha o modal e reseta o formulário.
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
    this.imagemPreview = '';
    this.mensagem = '';
    this.mensagemTipo = '';
  }

  /**
   * Carrega a lista de veículos da API.
   */
  carregarFrota(): void {
    this.loading = true;
    this.http
      .get<Resultado[]>(this.apiUrl, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (data) => {
          this.cardsGerados = data;
          if (this.cardsGerados.length === 0) {
            this.mensagem = 'Nenhum veículo encontrado.';
            this.mensagemTipo = 'error';
          }
        },
        error: (error) => {
          if (error.status === 204) {
            this.cardsGerados = [];
            this.mensagem = 'Nenhum veículo encontrado.';
            this.mensagemTipo = 'error';
          } else {
            this.handleError(error, 'carregar frota');
          }
        },
        complete: () => (this.loading = false)
      });
  }

  /**
   * Adiciona um novo veículo via requisição POST.
   */
  adicionarVeiculo(veiculo: Veiculo): void {
    const formData = new FormData();
    formData.append(
      'data',
      new Blob(
        [
          JSON.stringify({
            numeracao: veiculo.numeracao,
            modelo: veiculo.modelo,
            marca: veiculo.marca,
            anoModelo: veiculo.anoModelo,
            kmAtual: veiculo.kmAtual,
            situacao: veiculo.situacao,
            placa: veiculo.placa,
            kmProxTrocaOleo: veiculo.kmProxTrocaOleo,
            kmProxTrocaPneu: veiculo.kmProxTrocaPneu,
            lotacao: veiculo.lotacao,
            categoria: veiculo.categoria,
            arCondicionado: veiculo.arCondicionado,
            wifi: veiculo.wifi,
            poltronaReclinavel: veiculo.poltronaReclinavel,
            tv: veiculo.tv,
            geladeira: veiculo.geladeira,
            sanitarios: veiculo.sanitarios
          })
        ],
        { type: 'application/json' }
      )
    );

    // const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    // if (input?.files?.[0]) {
    //   formData.append('imagem', input.files[0]);
    // } else if (veiculo.imagem) {
    //   // Inclui a imagem existente, se disponível
    //   formData.append('imagem', veiculo.imagem);
    // }

    this.http
      .post(this.apiUrl, formData, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (response) => {
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
   * Atualiza um veículo existente via requisição PUT.
   */
  atualizarVeiculo(id: string, veiculo: Veiculo): void {
    const formData = new FormData();
    formData.append(
      'data',
      new Blob(
        [
          JSON.stringify({
            numeracao: veiculo.numeracao,
            modelo: veiculo.modelo,
            marca: veiculo.marca,
            anoModelo: veiculo.anoModelo,
            kmAtual: veiculo.kmAtual,
            situacao: veiculo.situacao.toUpperCase(),
            placa: veiculo.placa,
            kmProxTrocaOleo: veiculo.kmProxTrocaOleo,
            kmProxTrocaPneu: veiculo.kmProxTrocaPneu,
            lotacao: veiculo.lotacao,
            categoria: veiculo.categoria,
            arCondicionado: veiculo.arCondicionado,
            wifi: veiculo.wifi,
            poltronaReclinavel: veiculo.poltronaReclinavel,
            tv: veiculo.tv,
            geladeira: veiculo.geladeira,
            sanitarios: veiculo.sanitarios
          })
        ],
        { type: 'application/json' }
      )
    );

    // const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    // if (input?.files?.[0]) {
    //   formData.append('imagem', input.files[0]);
    // } else if (veiculo.imagem) {
    //   // Mantém a imagem existente, se não houver nova imagem
    //   formData.append('imagem', veiculo.imagem);
    // }

    this.http
      .put(`${this.apiUrl}/${id}`, formData, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (response) => {
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
   * Valida os campos do formulário antes de salvar.
   */
  validaFormulario(): boolean {
    // Reseta mensagens anteriores
    this.mensagem = '';
    this.mensagemTipo = '';

    // Verifica campos obrigatórios
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

    // Validação da placa (7 caracteres)
    if (this.placa.length !== 7) {
      this.mensagem = 'A placa deve ter exatamente 7 caracteres.';
      this.mensagemTipo = 'error';
      return false;
    }

    // Validação de valores numéricos
    if (this.kmAtual < 0) {
      this.mensagem = 'A quilometragem atual não pode ser negativa.';
      this.mensagemTipo = 'error';
      return false;
    }

    if (this.kmProxTrocaOleo != null && this.kmProxTrocaOleo < 0) {
      this.mensagem = 'A quilometragem para próxima troca de óleo não pode ser negativa.';
      this.mensagemTipo = 'error';
      return false;
    }

    if (this.kmProxTrocaPneu != null && this.kmProxTrocaPneu < 0) {
      this.mensagem = 'A quilometragem para próxima troca de pneu não pode ser negativa.';
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
   * Obtém cabeçalhos de autenticação com token JWT.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      this.mensagem = 'Sessão expirada. Faça login novamente.';
      console.log(this.mensagem);
      this.mensagemTipo = 'error';
      this.router.navigate(['/frota']);
      throw new Error('Token ausente.');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  /**
   * Trata erros das requisições HTTP.
   */
  private handleError(error: any, action: string): void {
    console.error(`${action} falhou:`, error);
    let errorMessage = `Erro ao ${action}. Tente novamente mais tarde.`;
    if (error.status === 401 || error.status === 403) {
      errorMessage = 'Sessão expirada. Faça login novamente.';
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    } else if (error.status === 400 && error.error) {
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
    console.log(errorMessage);
  }

  criarVeiculo(veiculo: Veiculo): void {
    this.http.post<Veiculo>(this.apiUrl, veiculo, { headers: this.getAuthHeaders() }).subscribe({
      next: (response) => {
        this.mensagem = 'Veículo adicionado com sucesso!';
        this.mensagemTipo = 'success';
        this.carregarFrota();
        this.fecharModal();
      },
      error: (error) => this.handleError(error, 'adicionar veículo'),
      complete: () => (this.loading = false)
      
    });
  }




  

}
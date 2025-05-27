import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChildren,
  QueryList,
  ElementRef
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment';

interface Veiculo {
  id: string;
  modelo: string;
  placa: string;
  numeracao: string;
}

interface Excursao {
  id?: string;
  data: string;               // string no formato 'yyyy-MM-dd'
  titulo: string;
  descricao: string;
  veiculoId?: string;
  veiculo?: Veiculo;
  imagemUrl?: string;         // URL da imagem que vem da API (ou placeholder)
  imagem?: string;            // base64 para preview local (novo card)
  dataExcursao?: number;      // timestamp em ms
  dataExcursaoString?: string;// string 'yyyy-MM-dd' para novo card
  isNew?: boolean;            // marca se é card criado via modal (aguardando confirmação)
}

@Component({
  selector: 'app-excursoes',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './excursoes.component.html',
  styleUrls: ['./excursoes.component.css']
})
export class ExcursoesComponent implements OnInit {
  private baseUrl = `${environment.apiUrl}/excursao`;
  private veiculoUrl = `${environment.apiUrl}/veiculo/frota`;

  excursoes: Excursao[] = [];
  veiculos: Veiculo[] = [];
  excursaoForm: Excursao = this.resetForm();
  imagemSelecionada: File | null = null;
  editingId: string | null = null;
  showModal = false;
  errorMsg: string | null = null;
  mensagem: string = '';
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';

  @ViewChildren('inputUpload') uploads!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(
    private http: HttpClient,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarVeiculos();
    this.carregarExcursoes();
  }

  // ==== RESETAR FORMULÁRIO DO MODAL ====
  private resetForm(): Excursao {
    return {
      data: '',
      titulo: '',
      descricao: '',
      veiculoId: ''
    };
  }

  // ==== CABEÇALHO AUTENTICAÇÃO ====
  private isBrowser(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof localStorage !== 'undefined'
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.isBrowser() ? localStorage.getItem('token') || '' : '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // ==== CARREGAR EXCURSÕES DA API (Corrigido para checar data válida) ====
  carregarExcursoes(): void {
    this.http
      .get<Excursao[]>(this.baseUrl, {
        headers: this.getAuthHeaders()
      })
      .subscribe({
        next: data => {
          if (Array.isArray(data)) {
            this.excursoes = data.map(e => {
              // 1) Pegar e.data e validar
              let dataFormatada = '';
              if (e.data) {
                const d = new Date(e.data);
                if (!isNaN(d.getTime())) {
                  dataFormatada = d.toISOString().substring(0, 10);
                }
              }
              // 2) Pegar e.dataExcursao (timestamp) e validar
              let dataExcursaoStr = '';
              if (e.dataExcursao) {
                const de = new Date(e.dataExcursao);
                if (!isNaN(de.getTime())) {
                  dataExcursaoStr = de.toISOString().substring(0, 10);
                }
              }

              return {
                ...e,
                data: dataFormatada,
                imagemUrl: e.imagemUrl || 'assets/imagens/placeholder.jpg',
                isNew: false,
                dataExcursaoString: dataExcursaoStr
              };
            });
          } else {
            this.excursoes = [];
          }
          this.cdref.detectChanges();
        },
        error: err => {
          console.error('Erro ao carregar excursões:', err);
          this.errorMsg = 'Erro ao carregar excursões.';
        }
      });
  }

  // ==== CARREGAR VEÍCULOS DA API ====
  carregarVeiculos(): void {
    this.http
      .get<Veiculo[]>(this.veiculoUrl, {
        headers: this.getAuthHeaders()
      })
      .subscribe({
        next: data => {
          this.veiculos = data || [];
        },
        error: err => {
          console.error('Erro ao carregar veículos:', err);
        }
      });
  }

  // ==== ABRIR MODAL PARA UM NOVO CADASTRO ====
  abrirModalParaNovo(): void {
    this.showModal = true;
    this.imagemSelecionada = null;
    this.editingId = null;
    this.excursaoForm = this.resetForm();
  }

  // ==== ABRIR MODAL PARA EDITAR UMA EXCURSÃO EXISTENTE ====
  abrirModalParaEditar(exc: Excursao): void {
    this.showModal = true;
    this.imagemSelecionada = null;
    this.editingId = exc.id || null;

    // Preencher o form com os dados selecionados
    this.excursaoForm = {
      id: exc.id,
      data: exc.data,
      titulo: exc.titulo,
      descricao: exc.descricao,
      veiculoId: exc.veiculoId || '',
      imagemUrl: exc.imagemUrl
    };
  }

  // ==== FECHAR MODAL E RESETAR ====
  closeModal(): void {
    this.showModal = false;
    this.excursaoForm = this.resetForm();
    this.editingId = null;
    this.imagemSelecionada = null;
  }

  // ==== CAPTURAR ARQUIVO SELECIONADO NO MODAL ====
  onFileChange(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.imagemSelecionada = file;
    }
  }

  /**
   * ==== SALVAR VIA MODAL (POST OU PUT) ====
   * - Se editingId for nulo → cria novo (POST) e insere imediatamente em excursoes.
   * - Se editingId existir → atualiza (PUT) e recarrega lista inteira.
   */
  salvarViaModal(): void {
    const formData = new FormData();
    formData.append('titulo', this.excursaoForm.titulo);
    formData.append('descricao', this.excursaoForm.descricao);

    // Converter a data string em timestamp (ms)
    const timestamp = new Date(this.excursaoForm.data).getTime().toString();
    formData.append('dataExcursao', timestamp);

    formData.append('veiculoId', this.excursaoForm.veiculoId || '');

    if (this.imagemSelecionada) {
      formData.append('file', this.imagemSelecionada);
    }

    const headers = this.getAuthHeaders();

    if (this.editingId) {
      // === EDIÇÃO DE REGISTRO EXISTENTE ===
      this.http
        .put(
          `${this.baseUrl}/${this.editingId}`,
          formData,
          { headers, responseType: 'text' }
        )
        .subscribe({
          next: res => {
            this.mostrarMensagem(res, 'sucesso');
            this.closeModal();
            // Atualiza toda a lista (para exibir dados atualizados)
            this.carregarExcursoes();
          },
          error: err => {
            console.error('Erro ao atualizar excursão:', err);
            this.mostrarMensagem('Erro ao atualizar excursão.', 'erro');
          }
        });
    } else {
      // === NOVO REGISTRO ===
      this.http
        .post(this.baseUrl, formData, { headers, responseType: 'json' })
        .subscribe({
          next: (novo: any) => {
            // Supondo que a API retorne JSON { id, titulo, descricao, data, veiculoId, veiculo?, imagemUrl?, dataExcursao? }
            const criado: Excursao = {
              id: novo.id,
              titulo: novo.titulo,
              descricao: novo.descricao,
              data: (() => {
                const d = new Date(novo.data);
                return isNaN(d.getTime())
                  ? ''
                  : d.toISOString().substring(0, 10);
              })(),
              veiculoId: novo.veiculoId,
              veiculo: novo.veiculo,
              imagemUrl: novo.imagemUrl || 'logo.jpg',
              isNew: false,
              dataExcursaoString: (() => {
                if (novo.dataExcursao) {
                  const de = new Date(novo.dataExcursao);
                  return isNaN(de.getTime())
                    ? ''
                    : de.toISOString().substring(0, 10);
                }
                return '';
              })()
            };

            // Fecha modal
            this.closeModal();

            // Insere o novo card no topo da lista
            this.excursoes.unshift(criado);
            this.mostrarMensagem('Excursão criada com sucesso!', 'sucesso');
          },
          error: err => {
            console.error('Erro ao salvar excursão:', err);
            this.mostrarMensagem('Erro ao salvar excursão.', 'erro');
          }
        });
    }
  }

  // ==== EXCLUIR VIA TABELA (LINHA) ====
  excluirExcursao(id: string): void {
    if (!confirm('Tem certeza que deseja excluir esta excursão?')) {
      return;
    }
    const headers = this.getAuthHeaders();
    this.http.delete(`${this.baseUrl}/${id}`, { headers }).subscribe({
      next: () => {
        // Remove o item da lista local
        this.excursoes = this.excursoes.filter(e => e.id !== id);
        this.mostrarMensagem('Excursão excluída com sucesso!', 'sucesso');
      },
      error: err => {
        console.error('Erro ao excluir excursão:', err);
        this.mostrarMensagem('Erro ao excluir excursão.', 'erro');
      }
    });
  }

  // ==== MENSAGEM TEMPORÁRIA DE FEEDBACK ====
  private mostrarMensagem(texto: string, tipo: 'sucesso' | 'erro'): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
    setTimeout(() => {
      this.mensagem = '';
      this.tipoMensagem = 'sucesso';
    }, 4000);
  }

  // ==== FUNCIONALIDADES DE UPLOAD/CONFIRMAÇÃO DE CARD ====

  abrirUpload(index: number): void {
    const inputEl = this.uploads.toArray()[index]?.nativeElement;
    if (inputEl) {
      inputEl.click();
    }
  }

  selecionarImagem(event: any, index: number): void {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.excursoes[index].imagem = e.target.result;
      this.cdref.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  /**
   * Quando o card for “isNew = true” (criado via modal e inserido pela lógica acima),
   * o usuário poderá confirmar para enviar de fato ao backend, ou cancelar para retirar o card.
   */
  confirmarCard(index: number): void {
    const excursao = this.excursoes[index];
    const headers = this.getAuthHeaders();
    const formData = new FormData();

    // Converter a data (string) em timestamp
    if (excursao.dataExcursaoString) {
      excursao.dataExcursao = new Date(
        excursao.dataExcursaoString
      ).getTime();
    }

    formData.append('titulo', excursao.titulo);
    formData.append('descricao', excursao.descricao);
    formData.append(
      'dataExcursao',
      excursao.dataExcursao ? excursao.dataExcursao.toString() : ''
    );
    formData.append('veiculoId', excursao.veiculoId || '');

    // Se tiver selecionado arquivo no card
    const inputFile = this.uploads.toArray()[index]?.nativeElement;
    if (inputFile?.files && inputFile.files[0]) {
      formData.append('file', inputFile.files[0]);
    }

    if (excursao.isNew) {
      // Criar nova excursão via card
      this.http.post(this.baseUrl, formData, { headers, responseType: 'json' }).subscribe({
        next: (novo: any) => {
          // Substituir o card temporário pelo objeto definitivo vindo da API
          const realizado: Excursao = {
            id: novo.id,
            titulo: novo.titulo,
            descricao: novo.descricao,
            data: (() => {
              const d = new Date(novo.data);
              return isNaN(d.getTime())
                ? ''
                : d.toISOString().substring(0, 10);
            })(),
            veiculoId: novo.veiculoId,
            veiculo: novo.veiculo,
            imagemUrl: novo.imagemUrl || 'logo.jpg',
            isNew: false,
            dataExcursaoString: (() => {
              if (novo.dataExcursao) {
                const de = new Date(novo.dataExcursao);
                return isNaN(de.getTime())
                  ? ''
                  : de.toISOString().substring(0, 10);
              }
              return '';
            })()
          };
          // Substitui o índice atual pelo registro definitivo
          this.excursoes[index] = realizado;
          this.mostrarMensagem('Excursão criada com sucesso!', 'sucesso');
        },
        error: err => {
          console.error('Erro ao salvar excursão via card:', err);
          this.mostrarMensagem('Erro ao salvar excursão.', 'erro');
        }
      });
    } else if (excursao.id) {
      // Atualizar excursão existente via card
      this.http.put(`${this.baseUrl}/${excursao.id}`, formData, { headers, responseType: 'json' }).subscribe({
        next: (resp: any) => {
          // Atualiza o objeto local com possíveis dados retornados
          const atualizado: Excursao = {
            id: resp.id,
            titulo: resp.titulo,
            descricao: resp.descricao,
            data: (() => {
              const d = new Date(resp.data);
              return isNaN(d.getTime())
                ? ''
                : d.toISOString().substring(0, 10);
            })(),
            veiculoId: resp.veiculoId,
            veiculo: resp.veiculo,
            imagemUrl: resp.imagemUrl || 'assets/imagens/placeholder.jpg',
            isNew: false,
            dataExcursaoString: (() => {
              if (resp.dataExcursao) {
                const de = new Date(resp.dataExcursao);
                return isNaN(de.getTime())
                  ? ''
                  : de.toISOString().substring(0, 10);
              }
              return '';
            })()
          };
          this.excursoes[index] = atualizado;
          this.mostrarMensagem('Excursão atualizada com sucesso!', 'sucesso');
        },
        error: err => {
          console.error('Erro ao atualizar excursão via card:', err);
          this.mostrarMensagem('Erro ao atualizar excursão.', 'erro');
        }
      });
    }
  }

  cancelarCard(index: number): void {
    const excursao = this.excursoes[index];
    if (excursao.isNew) {
      // Remove o card temporário que ainda não foi persistido
      this.excursoes.splice(index, 1);
    } else {
      // Se já existia, apenas recarrega a lista completa para cancelar mudanças
      this.carregarExcursoes();
    }
  }

  apagarCard(index: number): void {
    const excursao = this.excursoes[index];
    if (excursao.id) {
      if (!confirm('Tem certeza que deseja excluir esta excursão?')) {
        return;
      }
      this.http.delete(`${this.baseUrl}/${excursao.id}`, { headers: this.getAuthHeaders() }).subscribe({
        next: () => {
          this.excursoes.splice(index, 1);
          this.mostrarMensagem('Excursão excluída com sucesso!', 'sucesso');
        },
        error: err => {
          console.error('Erro ao excluir excursão via card:', err);
          this.mostrarMensagem('Erro ao excluir excursão.', 'erro');
        }
      });
    } else {
      // Caso seja apenas um card temporário (isNew), remove-o sem chamar API
      this.excursoes.splice(index, 1);
    }
  }
}

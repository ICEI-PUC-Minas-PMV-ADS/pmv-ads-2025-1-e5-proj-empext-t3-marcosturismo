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
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment';

/**
 * Interface simplificada para Excursão (sem veiculo).
 */
interface Excursao {
  id?: string;
  data: string;             // 'yyyy-MM-dd'
  titulo: string;
  descricao: string;
  imagemUrl?: string;
  imagem?: string | File;
  isNew?: boolean;
}

@Component({
  selector: 'app-excursoes',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './excursoes.component.html',
  styleUrls: ['./excursoes.component.css'],
})
export class ExcursoesComponent implements OnInit {
  private baseUrl = `${environment.apiUrl}/excursao`;

  excursoes: Excursao[] = [];
  excursaoForm: Excursao = this.resetForm();
  imagemSelecionada: File | null = null;
  editingId: string | null = null;
  showModal = false;
  errorMsg: string | null = null;
  mensagem: string = '';
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';

  @ViewChildren('inputUpload') uploads!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(private http: HttpClient, private cdref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregarExcursoes();
  }

  private resetForm(): Excursao {
    return {
      data: '',
      titulo: '',
      descricao: '',
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

  /**
   * 1) Carrega excursões futuras (GET /excursao?date=<now>).
   *    Converte dataExcursao (ms) → string 'yyyy-MM-dd' e imgUrl → imagemUrl.
   */
  carregarExcursoes(): void {
    const timestampNow = Date.now().toString();
    const urlComTimestamp = `${this.baseUrl}?date=${timestampNow}`;

    this.http.get<any[]>(urlComTimestamp, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (data) => {
          if (Array.isArray(data)) {
            this.excursoes = data.map(e => {
              // Converte dataExcursao (ms) em string 'yyyy-MM-dd'
              let formattedDate = '';
              if ((e as any).dataExcursao) {
                const candidate = new Date((e as any).dataExcursao);
                if (!isNaN(candidate.getTime())) {
                  formattedDate = candidate.toISOString().substring(0, 10);
                }
              }

              return {
                id:        e.id,
                titulo:    e.titulo,
                descricao: e.descricao,
                data:      formattedDate,
                imagemUrl: e.imgUrl || 'assets/imagens/placeholder.jpg',
                isNew:     false
              } as Excursao;
            });
          } else {
            this.excursoes = [];
          }
          this.cdref.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao carregar excursões:', err);
          this.errorMsg = 'Erro ao carregar excursões.';
        }
      });
  }

  /**
   * 2) Abre o modal para criar (sem parâmetro) ou editar (com parâmetro).
   */
  openModal(excursao?: Excursao): void {
    this.showModal = true;
    this.imagemSelecionada = null;

    if (excursao) {
      this.editingId = excursao.id || null;
      this.excursaoForm = {
        id:        excursao.id,
        data:      excursao.data,
        titulo:    excursao.titulo,
        descricao: excursao.descricao,
        imagemUrl: excursao.imagemUrl
      } as Excursao;
    } else {
      this.editingId = null;
      this.excursaoForm = this.resetForm();
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.excursaoForm = this.resetForm();
    this.editingId = null;
    this.imagemSelecionada = null;
  }

  onFileChange(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.imagemSelecionada = file;
    }
    if (file) {
      this.imagemSelecionada = file;
    }
  }

  /**
   * 3) “Salvar” no modal: monta FormData e faz POST (criação) ou PUT (edição).
   */
  salvar(): void {
    const formData = new FormData();
    formData.append('titulo', this.excursaoForm.titulo);
    formData.append('descricao', this.excursaoForm.descricao);

    const candidateDate = new Date(this.excursaoForm.data);
    const timestamp = !isNaN(candidateDate.getTime())
      ? candidateDate.getTime().toString()
      : '';
    formData.append('dataExcursao', timestamp);

    formData.append('veiculoId', this.excursaoForm.veiculoId || '');

    if (this.imagemSelecionada) {
      formData.append('file', this.imagemSelecionada);
    } else {
      // Envia um Blob vazio para não quebrar no backend
      const blobVazio = new Blob([], { type: 'application/octet-stream' });
      formData.append('file', blobVazio, 'placeholder.txt');
    }

    const headers = this.getAuthHeaders();
    let request$;

    if (this.editingId) {
      // PUT /excursao/{id}
      request$ = this.http.put<any>(
        `${this.baseUrl}/${this.editingId}`,
        formData,
        { headers }
      );
    } else {
      // POST /excursao
      request$ = this.http.post<any>(
        this.baseUrl,
        formData,
        { headers }
      );
    }

    request$.subscribe({
      next: (res) => {
        this.mostrarMensagem(
          this.editingId
            ? 'Excursão atualizada com sucesso!'
            : 'Excursão criada com sucesso!',
          'sucesso'
        );
        this.closeModal();
        this.carregarExcursoes();
      },
      error: (err: HttpErrorResponse) => {
        let msg = 'Erro ao salvar excursão. Veja console para detalhes.';
        if (err.status === 400 && err.error && typeof err.error === 'object' && err.error.erro) {
          msg = err.error.erro;
        }
        console.error('Erro ao salvar via modal:', err);
        this.mostrarMensagem(msg, 'erro');
      }
    });
  }

  editarExcursao(exc: Excursao): void {
    this.openModal(exc);
  }

  excluirExcursao(id: string): void {
    if (!confirm('Tem certeza que deseja excluir esta excursão?')) {
      return;
    }
    const headers = this.getAuthHeaders();
    this.http.delete<any>(`${this.baseUrl}/${id}`, { headers })
      .subscribe({
        next: (res) => {
          this.excursoes = this.excursoes.filter(e => e.id !== id);
          const mensagem = (res && res.mensagem) ? res.mensagem : 'Excursão excluída com sucesso!';
          this.mostrarMensagem(mensagem, 'sucesso');
        },
        error: (err) => {
          console.error('Erro ao excluir excursão:', err);
          let msg = 'Erro ao excluir excursão.';
          if (err.status === 404 && err.error && err.error.erro) {
            msg = err.error.erro;
          }
          this.mostrarMensagem(msg, 'erro');
        }
      });
  }

  private mostrarMensagem(texto: string, tipo: 'sucesso' | 'erro'): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
    setTimeout(() => {
      this.mensagem = '';
      this.tipoMensagem = 'sucesso';
    }, 4000);
  }

  /**
   * 4) Adiciona um card inline para criação rápida (sem veículo).
   */
  adicionarCard(): void {
    console.log('Criando novo card inline (sem veículo).');
    const hojeStr = new Date().toISOString().substring(0, 10);

    const novoCard: Excursao = {
      titulo: '',
      descricao: '',
      data: hojeStr,
      imagemUrl: 'assets/imagens/placeholder.jpg',
      imagem: 'assets/imagens/placeholder.jpg',
      isNew: true
    };

    this.excursoes.push(novoCard);
    this.cdref.detectChanges();
  }

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

  confirmarCard(index: number): void {
    const excursao = this.excursoes[index];
    const headers = this.getAuthHeaders();
    const formData = new FormData();

    formData.append('titulo', excursao.titulo);
    formData.append('descricao', excursao.descricao);

    const candidateDate = new Date(excursao.data);
    const timestamp = !isNaN(candidateDate.getTime()) ? candidateDate.getTime().toString() : '';
    formData.append('dataExcursao', timestamp);

    if (excursao.imagem instanceof File) {
      formData.append('file', excursao.imagem);
    } else {
      const blobVazio = new Blob([], { type: 'application/octet-stream' });
      formData.append('file', blobVazio, 'placeholder.txt');
    }

    if (excursao.isNew) {
      // POST /excursao
      this.http.post<any>(`${this.baseUrl}`, formData, { headers })
        .subscribe({
          next: (res) => {
            const nova: Excursao = {
              id:        res.id,
              titulo:    res.titulo,
              descricao: res.descricao,
              data:      new Date(res.dataExcursao).toISOString().substring(0, 10),
              imagemUrl: res.imgUrl || (excursao.imagem as string),
              isNew:     false
            };
            this.excursoes[index] = nova;
            this.mostrarMensagem('Excursão criada com sucesso!', 'sucesso');
          },
          error: (err: HttpErrorResponse) => {
            let msg = 'Erro ao criar excursão. Veja console para detalhes.';
            if (err.status === 400 && err.error && typeof err.error === 'object' && err.error.erro) {
              msg = err.error.erro;
            }
            console.error('Erro ao criar excursão:', err);
            this.mostrarMensagem(msg, 'erro');
          }
        });
    } else if (excursao.id) {
      // PUT /excursao/{id}
      this.http.put<any>(`${this.baseUrl}/${excursao.id}`, formData, { headers })
        .subscribe({
          next: (res) => {
            this.excursoes[index] = {
              ...this.excursoes[index],
              titulo:    res.titulo,
              descricao: res.descricao,
              data:      new Date(res.dataExcursao).toISOString().substring(0, 10),
              imagemUrl: res.imgUrl || this.excursoes[index].imagemUrl,
              isNew:     false
            };
            this.mostrarMensagem('Excursão atualizada com sucesso!', 'sucesso');
          },
          error: (err: HttpErrorResponse) => {
            let msg = 'Erro ao atualizar excursão. Veja console para detalhes.';
            if (err.status === 400 && err.error && typeof err.error === 'object' && err.error.erro) {
              msg = err.error.erro;
            }
            console.error('Erro ao atualizar excursão:', err);
            this.mostrarMensagem(msg, 'erro');
          }
        });
    }

    delete excursao.isNew;
  }

  cancelarCard(index: number): void {
    const excursao = this.excursoes[index];
    if (excursao.isNew) {
      this.excursoes.splice(index, 1);
    } else {
      this.carregarExcursoes();
    }
  }

  apagarCard(index: number): void {
    const excursao = this.excursoes[index];
    if (excursao.id) {
      if (!confirm('Tem certeza que deseja excluir esta excursão?')) {
        return;
      }
      const headers = this.getAuthHeaders();
      this.http.delete<any>(`${this.baseUrl}/${excursao.id}`, { headers })
        .subscribe({
          next: (res) => {
            this.excursoes.splice(index, 1);
            const mensagem = (res && res.mensagem) ? res.mensagem : 'Excursão excluída com sucesso!';
            this.mostrarMensagem(mensagem, 'sucesso');
          },
          error: (err) => {
            console.error('Erro ao excluir excursão:', err);
            let msg = 'Erro ao excluir excursão.';
            if (err.status === 404 && err.error && err.error.erro) {
              msg = err.error.erro;
            }
            this.mostrarMensagem(msg, 'erro');
          }
        });
    } else {
      // Caso seja apenas um card temporário (isNew), remove-o sem chamar API
      this.excursoes.splice(index, 1);
    }
  }

  getImagemSrc(e: Excursao): string {
    if (e.imagem && typeof e.imagem === 'string') {
      return e.imagem;
    }
    return e.imagemUrl || 'assets/imagens/placeholder.jpg';
  }
}

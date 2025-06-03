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
  private baseUrl: string = `${environment.apiUrl}/excursao`;

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

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.isBrowser() ? localStorage.getItem('token') || '' : '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  /**
   * 1) Carrega todas as excursões (GET /excursao) — requer token.
   */
  carregarExcursoes(): void {
    this.http.get<any[]>(`${this.baseUrl}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (data) => {
          if (Array.isArray(data)) {
            this.excursoes = data.map(e => {
              let formattedDate = '';
              if (e.dataExcursao) {
                const d = new Date(e.dataExcursao);
                if (!isNaN(d.getTime())) {
                  formattedDate = d.toISOString().substring(0, 10);
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
   * 2) Abre o modal para criar/editar.
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
  }

  /**
   * 3) Salvar (criar ou editar) usando multipart/form-data.
   *     — Se não houver imagem selecionada, usamos um PNG 1×1 transparente (base64) como placeholder.
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

    if (this.imagemSelecionada) {
      // Se o usuário escolheu um arquivo, envia ele diretamente
      formData.append('file', this.imagemSelecionada);
    } else {
      // Senão, convertemos um PNG transparente mínimamente válido (1x1) para Blob
      const placeholderBase64 = 
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';
      const byteCharacters = atob(placeholderBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blobImg = new Blob([byteArray], { type: 'image/png' });
      // Nome do arquivo: placeholder.png — o backend vai aceitar image/png
      formData.append('file', blobImg, 'placeholder.png');
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
            : 'Excursão registrada com sucesso!',
          'sucesso'
        );
        this.closeModal();
        this.carregarExcursoes();
      },
      error: (err: HttpErrorResponse) => {
        let msg = 'Erro ao salvar excursão. Veja console para detalhes.';
        // Se o backend retornar um JSON com { erro: "mensagem" }
        if (err.status === 400 && err.error && (err.error as any).erro) {
          msg = (err.error as any).erro;
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
          const mensagem = (res && (res as any).mensagem) ? (res as any).mensagem : 'Excursão excluída com sucesso!';
          this.mostrarMensagem(mensagem, 'sucesso');
        },
        error: (err) => {
          console.error('Erro ao excluir excursão:', err);
          let msg = 'Erro ao excluir excursão.';
          if (err.status === 404 && err.error && (err.error as any).erro) {
            msg = (err.error as any).erro;
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
   * 4) Adiciona um card inline (sem veículo). Depois, ao “confirmar”, também manda multipart/form-data.
   */
  adicionarCard(): void {
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
    if (!file) { return; }
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

    const date = new Date(excursao.data);
    const timestamp = !isNaN(date.getTime()) ? date.getTime().toString() : '';
    formData.append('dataExcursao', timestamp);

    if (excursao.imagem instanceof File) {
      formData.append('file', excursao.imagem);
    } else {
      // Mesmo PNG transparente base64, se usuário não escolheu imagem
      const placeholderBase64 = 
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';
      const byteCharacters = atob(placeholderBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blobImg = new Blob([byteArray], { type: 'image/png' });
      formData.append('file', blobImg, 'placeholder.png');
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
            this.mostrarMensagem('Excursão registrada com sucesso!', 'sucesso');
          },
          error: (err: HttpErrorResponse) => {
            let msg = 'Erro ao criar excursão. Veja console para detalhes.';
            if (err.status === 400 && err.error && (err.error as any).erro) {
              msg = (err.error as any).erro;
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
            if (err.status === 400 && err.error && (err.error as any).erro) {
              msg = (err.error as any).erro;
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
            const mensagem = (res && (res as any).mensagem) ? (res as any).mensagem : 'Excursão excluída com sucesso!';
            this.mostrarMensagem(mensagem, 'sucesso');
          },
          error: (err) => {
            console.error('Erro ao excluir excursão:', err);
            let msg = 'Erro ao excluir excursão.';
            if (err.status === 404 && err.error && (err.error as any).erro) {
              msg = (err.error as any).erro;
            }
            this.mostrarMensagem(msg, 'erro');
          }
        });
    } else {
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

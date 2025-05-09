import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChildren,
  ElementRef,
  QueryList
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule
} from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment';

/**
 * Representa uma excursão.
 */
interface Excursao {
  id?: string;
  titulo: string;
  descricao: string;
  dataExcursao?: number;
  imagem?: string;
  isNew?: boolean;
}

@Component({
  selector: 'app-excursoes',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, SidebarComponent],
  templateUrl: './excursoes.component.html',
  styleUrls: ['./excursoes.component.css']
})
export class ExcursoesComponent implements OnInit {
  private baseUrl = `${environment.apiUrl}/excursao`;

  excursoes: Excursao[] = [];
  errorMsg: string | null = null;
  mensagem: string = '';
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';

  @ViewChildren('inputUpload') uploads!: QueryList<ElementRef>;

  constructor(
    private http: HttpClient,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarExcursoes(); // GET inicial
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || localStorage.getItem('auth_token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  private mostrarMensagem(texto: string, tipo: 'sucesso' | 'erro') {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
    setTimeout(() => {
      this.mensagem = '';
      this.tipoMensagem = 'sucesso';
    }, 5000);
  }

  /** GET: carrega todas as excursões. */
  carregarExcursoes(): void {
    this.http.get<Excursao[]>(this.baseUrl, { headers: this.getAuthHeaders() })
      .subscribe({
        next: data => {
          this.excursoes = Array.isArray(data)
            ? data.map(e => ({
                ...e,
                imagem: e.imagem || 'assets/imagens/placeholder.jpg',
                isNew: false
              }))
            : [];
          this.cdref.detectChanges();
        },
        error: err => {
          console.error('Erro ao carregar excursões:', err);
          this.errorMsg = 'Erro ao carregar excursões.';
          this.mostrarMensagem(this.errorMsg, 'erro');
        }
      });
  }

  /** Adiciona um card vazio (nova excursão). */
  adicionarCard(): void {
    this.excursoes.push({
      titulo: '',
      descricao: '',
      dataExcursao: new Date().getTime(),
      imagem: 'assets/imagens/placeholder.jpg',
      isNew: true
    });
  }

  abrirUpload(index: number): void {
    const uploadInput = this.uploads.toArray()[index];
    uploadInput?.nativeElement.click();
  }

  selecionarImagem(event: any, index: number): void {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e: any) => this.excursoes[index].imagem = e.target.result;
    reader.readAsDataURL(file);
  }

  /** POST/PUT: cria ou atualiza excursão. */
  confirmarCard(index: number): void {
    const excursao = this.excursoes[index];
    const headers = this.getAuthHeaders();

    const payload = {
      titulo: excursao.titulo,
      descricao: excursao.descricao,
      dataExcursao: excursao.dataExcursao!
    };

    if (excursao.isNew) {
      this.http.post<Excursao>(this.baseUrl, payload, { headers })
        .subscribe({
          next: res => {
            console.log('Excursão criada:', res);
            this.excursoes[index] = { ...res, imagem: excursao.imagem, isNew: false };
            this.mostrarMensagem('Excursão criada com sucesso!', 'sucesso');
          },
          error: err => {
            console.error('Erro ao salvar excursão:', err.error || err);
            this.errorMsg = 'Erro ao salvar excursão.';
            this.mostrarMensagem(this.errorMsg, 'erro');
          }
        });
    } else if (excursao.id) {
      this.http.put<Excursao>(`${this.baseUrl}/${excursao.id}`, payload, { headers })
        .subscribe({
          next: res => {
            console.log('Excursão atualizada:', res);
            this.mostrarMensagem('Excursão atualizada com sucesso!', 'sucesso');
          },
          error: err => {
            console.error('Erro ao atualizar excursão:', err.error || err);
            this.errorMsg = 'Erro ao atualizar excursão.';
            this.mostrarMensagem(this.errorMsg, 'erro');
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

  /** DELETE: exclui excursão. */
  apagarCard(index: number): void {
    const excursao = this.excursoes[index];
    if (excursao.id) {
      if (!confirm('Tem certeza que deseja excluir esta excursão?')) return;
      this.http.delete(`${this.baseUrl}/${excursao.id}`, { headers: this.getAuthHeaders() })
        .subscribe({
          next: () => {
            console.log(`Excursão ${excursao.id} excluída`);
            this.excursoes.splice(index, 1);
            this.mostrarMensagem('Excursão excluída com sucesso!', 'sucesso');
          },
          error: err => {
            console.error('Erro ao excluir excursão:', err.error || err);
            this.errorMsg = 'Erro ao excluir excursão.';
            this.mostrarMensagem(this.errorMsg, 'erro');
          }
        });
    } else {
      this.excursoes.splice(index, 1);
    }
  }
}

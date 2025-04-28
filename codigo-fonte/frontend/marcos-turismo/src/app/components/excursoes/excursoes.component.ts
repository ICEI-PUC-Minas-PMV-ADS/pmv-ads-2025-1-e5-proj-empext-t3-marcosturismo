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

/**
 * Representa uma excursão.
 */
interface Excursao {
  id?: string;
  imagem: string;
  descricao: string;
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
  private baseUrl = 'http://168.231.94.195:8080/ ';

  excursoes: Excursao[] = [];
  errorMsg: string | null = null;

  @ViewChildren('inputUpload') uploads!: QueryList<ElementRef>;

  constructor(
    private http: HttpClient,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarExcursoes(); // GET inicial
  }

  /**
   * Monta cabeçalhos de autenticação (apenas Authorization).
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || localStorage.getItem('auth_token') || '';
    console.log('Token:', token);
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  /**
   * GET: carrega todas as excursões.
   */
  carregarExcursoes(): void {
    this.http.get<Excursao[]>(this.baseUrl, { headers: this.getAuthHeaders() })
      .subscribe({
        next: data => {
          console.log('Excursões carregadas:', data);
          this.excursoes = Array.isArray(data) ? data : [];
          this.cdref.detectChanges();
        },
        error: err => {
          console.error('Erro ao carregar excursões:', err);
          this.errorMsg = 'Erro ao carregar excursões.';
        }
      });
  }

  adicionarCard(): void {
    this.excursoes.push({ imagem: 'placeholder.jpg', descricao: '', isNew: true });
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

  /**
   * POST ou PUT: cria ou atualiza excursão.
   */
  confirmarCard(index: number): void {
    const excursao = this.excursoes[index];
    const headers = this.getAuthHeaders();

    if (excursao.isNew) {
      // Cria nova excursão
      this.http.post<Excursao>(this.baseUrl, excursao, { headers })
        .subscribe({
          next: res => {
            console.log('Excursão criada:', res);
            this.excursoes[index] = { ...res };
          },
          error: err => {
            console.error('Erro ao salvar excursão:', err);
            this.errorMsg = 'Erro ao salvar excursão.';
          }
        });
    } else if (excursao.id) {
      // Atualiza existente
      this.http.put<Excursao>(`${this.baseUrl}/${excursao.id}`, excursao, { headers })
        .subscribe({
          next: res => console.log('Excursão atualizada:', res),
          error: err => {
            console.error('Erro ao atualizar excursão:', err);
            this.errorMsg = 'Erro ao atualizar excursão.';
          }
        });
    }

    delete excursao.isNew;
  }

  /**
   * Cancela edição/criação e recarrega lista se necessário.
   */
  cancelarCard(index: number): void {
    const excursao = this.excursoes[index];
    if (excursao.isNew) {
      this.excursoes.splice(index, 1);
    } else {
      this.carregarExcursoes();
    }
  }

  /**
   * DELETE: exclui excursão no backend e no array local.
   */
  apagarCard(index: number): void {
    const excursao = this.excursoes[index];
    if (excursao.id) {
      if (!confirm('Tem certeza que deseja excluir esta excursão?')) return;
      this.http.delete(`${this.baseUrl}/${excursao.id}`, { headers: this.getAuthHeaders() })
        .subscribe({
          next: () => {
            console.log(`Excursão ${excursao.id} excluída`);
            this.excursoes.splice(index, 1);
          },
          error: err => {
            console.error('Erro ao excluir excursão:', err);
            this.errorMsg = 'Erro ao excluir excursão.';
          }
        });
    } else {
      this.excursoes.splice(index, 1);
    }
  }
}

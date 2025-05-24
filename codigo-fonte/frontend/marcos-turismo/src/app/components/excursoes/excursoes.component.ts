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
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment';

interface Excursao {
  id?: string;
  titulo: string;
  descricao: string;
  dataExcursao?: number;        // timestamp em ms
  dataExcursaoString?: string;  // string 'yyyy-MM-dd' para input date
  imagem?: string;
  imgUrl?: string;
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
    this.carregarExcursoes();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.isBrowser() ? localStorage.getItem('token') || '' : '';
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

  carregarExcursoes(): void {
    this.http.get<Excursao[]>(this.baseUrl, { headers: this.getAuthHeaders() })
      .subscribe({
        next: data => {
          this.excursoes = Array.isArray(data)
            ? data.map(e => ({
                ...e,
                imagem: e.imgUrl || 'assets/imagens/placeholder.jpg',
                isNew: false,
                dataExcursaoString: e.dataExcursao
                  ? new Date(e.dataExcursao).toISOString().substring(0, 10)
                  : ''
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

  adicionarCard(): void {
    const hojeStr = new Date().toISOString().substring(0, 10);
    this.excursoes.push({
      titulo: '',
      descricao: '',
      dataExcursaoString: hojeStr,
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

    // Converte dataExcursaoString para timestamp
    if (excursao.dataExcursaoString) {
      excursao.dataExcursao = new Date(excursao.dataExcursaoString).getTime();
    }

    formData.append('titulo', excursao.titulo);
    formData.append('descricao', excursao.descricao);
    formData.append('dataExcursao', excursao.dataExcursao ? excursao.dataExcursao.toString() : '');

    const inputEl = this.uploads.toArray()[index]?.nativeElement;
    if (inputEl?.files && inputEl.files[0]) {
      formData.append('file', inputEl.files[0]);
    }

    if (excursao.isNew) {
      this.http.post(this.baseUrl, formData, { headers }).subscribe({
        next: () => {
          this.mostrarMensagem('Excursão criada com sucesso!', 'sucesso');
          this.carregarExcursoes();
        },
        error: err => {
          console.error('Erro ao salvar excursão:', err.error || err);
          this.mostrarMensagem('Erro ao salvar excursão.', 'erro');
        }
      });
    } else if (excursao.id) {
      this.http.put(`${this.baseUrl}/${excursao.id}`, formData, { headers }).subscribe({
        next: () => {
          this.mostrarMensagem('Excursão atualizada com sucesso!', 'sucesso');
          this.carregarExcursoes();
        },
        error: err => {
          console.error('Erro ao atualizar excursão:', err.error || err);
          this.mostrarMensagem('Erro ao atualizar excursão.', 'erro');
        }
      });
    }
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
      if (!confirm('Tem certeza que deseja excluir esta excursão?')) return;
      this.http.delete(`${this.baseUrl}/${excursao.id}`, { headers: this.getAuthHeaders() })
        .subscribe({
          next: () => {
            this.excursoes.splice(index, 1);
            this.mostrarMensagem('Excursão excluída com sucesso!', 'sucesso');
          },
          error: err => {
            console.error('Erro ao excluir excursão:', err.error || err);
            this.mostrarMensagem('Erro ao excluir excursão.', 'erro');
          }
        });
    } else {
      this.excursoes.splice(index, 1);
    }
  }
}

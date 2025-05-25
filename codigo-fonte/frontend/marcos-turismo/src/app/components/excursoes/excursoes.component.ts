import {
  Component,
  OnInit
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


import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment';

interface Excursao {
  id?: string;
  data: string;       // data da excursão no formato ISO string (ex: '2025-05-25')
  titulo: string;     // mapeado do campo destino
  descricao: string;

  veiculoId?: string; // não usado pela API, mas mantido caso queira usar localmente
  veiculo?: Veiculo;
  imagem?: string;
  imagemUrl?: string;

  dataExcursao?: number;        // timestamp em ms
  dataExcursaoString?: string;  // string 'yyyy-MM-dd' para input date
  imagem?: string;
  imgUrl?: string;
  isNew?: boolean;

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
  private veiculoUrl = `${environment.apiUrl}/veiculo`;

  excursoes: Excursao[] = [];
  veiculos: Veiculo[] = [];
  excursaoForm: Excursao = this.resetForm();
  imagemSelecionada: File | null = null;
  editingId: string | null = null;
  showModal = false;
  errorMsg: string | null = null;
  mensagem: string = '';
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarExcursoes();

    this.carregarVeiculos();
  }

  private resetForm(): Excursao {
    return {
      data: '',
      titulo: '',
      descricao: '',
      veiculoId: ''
    };

  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.isBrowser() ? localStorage.getItem('token') || '' : '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });

  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  carregarExcursoes(): void {

    this.http.get<Excursao[]>(this.baseUrl, { headers: this.getAuthHeaders() }).subscribe({
      next: data => {
        if (Array.isArray(data)) {
          this.excursoes = data.map(e => ({
            ...e,
            data: new Date(e.data).toISOString().substring(0, 10), // para preencher input date
            imagemUrl: e.imagemUrl || 'assets/imagens/placeholder.jpg'
          }));
        } else {
          this.excursoes = [];

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
      },
      error: err => {
        console.error('Erro ao carregar excursões:', err);
        this.errorMsg = 'Erro ao carregar excursões.';
      }
    });
  }


  carregarVeiculos(): void {
    this.http.get<Veiculo[]>(this.veiculoUrl, { headers: this.getAuthHeaders() }).subscribe({
      next: data => {
        this.veiculos = data;
      },
      error: err => {
        console.error('Erro ao carregar veículos:', err);
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

  openModal(excursao?: Excursao): void {
    this.showModal = true;
    this.imagemSelecionada = null;

    if (excursao) {
      this.editingId = excursao.id || null;
      this.excursaoForm = {
        ...excursao
      };
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
    if (file) this.imagemSelecionada = file;
  }

  salvar(): void {
    const formData = new FormData();

    formData.append('titulo', this.excursaoForm.titulo);
    formData.append('descricao', this.excursaoForm.descricao);

    // Converter data para timestamp em ms
    const timestamp = new Date(this.excursaoForm.data).getTime().toString();
    formData.append('dataExcursao', timestamp);

    if (this.imagemSelecionada) {
      formData.append('file', this.imagemSelecionada);
    }

    const headers = this.getAuthHeaders();

    const request = this.editingId
      ? this.http.put(`${this.baseUrl}/${this.editingId}`, formData, { headers, responseType: 'text' })
      : this.http.post(this.baseUrl, formData, { headers, responseType: 'text' });

    request.subscribe({
      next: res => {
        this.mostrarMensagem(res, 'sucesso');
        this.closeModal();
        this.carregarExcursoes();
      },
      error: err => {
        console.error('Erro ao salvar excursão:', err);
        this.mostrarMensagem('Erro ao salvar excursão.', 'erro');
      }
    });

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

  editarExcursao(exc: Excursao): void {
    this.openModal(exc);
  }


  excluirExcursao(id: string): void {
    if (!confirm('Tem certeza que deseja excluir esta excursão?')) return;

    this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() }).subscribe({
      next: () => {
        this.excursoes = this.excursoes.filter(e => e.id !== id);
        this.mostrarMensagem('Excursão excluída com sucesso!', 'sucesso');
      },
      error: err => {
        console.error('Erro ao excluir excursão:', err);
        this.mostrarMensagem('Erro ao excluir excursão.', 'erro');
      }
    });
  }

  private mostrarMensagem(texto: string, tipo: 'sucesso' | 'erro') {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
    setTimeout(() => {
      this.mensagem = '';
      this.tipoMensagem = 'sucesso';
    }, 4000);

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

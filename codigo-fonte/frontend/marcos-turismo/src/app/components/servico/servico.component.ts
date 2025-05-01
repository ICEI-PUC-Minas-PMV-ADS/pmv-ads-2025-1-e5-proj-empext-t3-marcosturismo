import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../environments/environment';

interface Servico {
  id?: string;
  placa: string;
  km: string;
  fornecedor: string;
  nota: string;
  ultimaTrocaOleo: string;
  kmUltimaTroca: string;
  valorOleo: string;
  proximaTrocaOleo: string;
  pastilhaFreio: string;
  valorPastilhaFreio: string;
  checkupMotor: string;
  valorCheckup: string;
}

@Component({
  selector: 'app-servico',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, SidebarComponent],
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {
  private baseUrl = `${environment.apiUrl}/servico`;

  servicos: Servico[] = [];
  showModal = false;                // antes era isModalOpen
  errorMsg: string | null = null;
  public editingId: string | null = null;  // agora público

  servicoForm: Partial<Servico> = {
    placa: '',
    km: '',
    fornecedor: '',
    nota: '',
    ultimaTrocaOleo: '',
    kmUltimaTroca: '',
    valorOleo: '',
    proximaTrocaOleo: '',
    pastilhaFreio: '',
    valorPastilhaFreio: '',
    checkupMotor: '',
    valorCheckup: ''
  };

  constructor(private http: HttpClient, private cdref: ChangeDetectorRef) {}

  ngOnInit() {
    this.carregarServicos();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token não encontrado!');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  carregarServicos(): void {
    this.http.get<Servico[]>(this.baseUrl, { headers: this.getAuthHeaders() })
      .subscribe({
        next: data => {
          this.servicos = Array.isArray(data) ? data : [];
          this.cdref.detectChanges();
          this.errorMsg = null;
        },
        error: err => {
          console.error('Erro GET Servicos:', err);
          this.errorMsg = 'Erro ao buscar serviços.';
        }
      });
  }

  openModal(edit: boolean = false, servico?: Servico): void {
    this.showModal = true;
    if (edit && servico) {
      this.editingId = servico.id || null;
      this.servicoForm = { ...servico };
    } else {
      this.clearForm();
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.clearForm();
  }

  salvar(): void {
    const url = this.editingId
      ? `${this.baseUrl}/${this.editingId}`
      : this.baseUrl;
    const request$ = this.editingId
      ? this.http.put<string>(url, this.servicoForm, { headers: this.getAuthHeaders() })
      : this.http.post<string>(url, this.servicoForm, { headers: this.getAuthHeaders() });

    request$.subscribe({
      next: () => {
        this.carregarServicos();
        this.closeModal();
      },
      error: err => {
        console.error('Erro Salvar Servico:', err);
        this.errorMsg = this.editingId ? 'Erro ao atualizar serviço.' : 'Erro ao registrar serviço.';
      }
    });
  }

  editarServico(servico: Servico): void {
    this.openModal(true, servico);
  }

  excluirServico(id: string): void {
    const servico = this.servicos.find(s => s.id === id);
    if (!servico) {
      this.errorMsg = 'Serviço não encontrado.';
      return;
    }
    this.http.delete<string>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders(), responseType: 'text' as 'json' })
      .subscribe({
        next: () => this.carregarServicos(),
        error: err => {
          console.error('Erro DELETE Servico:', err);
          this.errorMsg = 'Erro ao excluir serviço.';
        }
      });
  }

  private clearForm(): void {
    this.editingId = null;
    this.servicoForm = {
      placa: '',
      km: '',
      fornecedor: '',
      nota: '',
      ultimaTrocaOleo: '',
      kmUltimaTroca: '',
      valorOleo: '',
      proximaTrocaOleo: '',
      pastilhaFreio: '',
      valorPastilhaFreio: '',
      checkupMotor: '',
      valorCheckup: ''
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ChangeDetectorRef } from '@angular/core';


interface Viagem {
  id: string;
  // outros campos conforme sua API
}

interface Cliente {
  id: string;
  nome: string;
  cpfCnpj: string;
  telefone?: string;
  endereco?: string;
  dataCriacao?: string;
  viagem: Viagem[];
}

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, SidebarComponent],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
editarClienteCliente(_t41: Cliente) {
throw new Error('Method not implemented.');
}
  private baseUrl = 'http://localhost:8080/cliente';

  clientes: Cliente[] = [];
  isModalOpen = false;
  errorMsg: string | null = null;
  private editingId: string | null = null;

  clienteForm: Partial<Cliente> = {
    nome: '',
    cpfCnpj: '',
    telefone: '',
    endereco: ''
  };

  constructor(private http: HttpClient, private cdref: ChangeDetectorRef) {}

  ngOnInit() {
    this.carregarClientes();
  }

  // seguindo o padrão do AvaliacaoComponent
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (!token) {
      alert('Token não encontrado!');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  carregarClientes(): void {
    this.http.get<Cliente[]>(`${this.baseUrl}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: data => {
          this.clientes = [...(Array.isArray(data) ? data : [])];
          this.cdref.detectChanges();
          this.errorMsg = null;
        },
        error: err => {
          console.error('Erro GET:', err);
          this.errorMsg = 'Erro ao buscar clientes.';
        }
      });
  }

  openModal(edit: boolean = false, cliente?: Cliente): void {
    this.isModalOpen = true;
    if (edit && cliente) {
      this.editingId = cliente.id;
      this.clienteForm = {
        nome: cliente.nome,
        cpfCnpj: cliente.cpfCnpj,
        telefone: cliente.telefone || '',
        endereco: cliente.endereco || ''
      };
    } else {
      this.clearForm();
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.clearForm();
  }

  salvar(): void {
    const url = this.editingId
      ? `${this.baseUrl}/${this.editingId}`
      : `${this.baseUrl}`;
    const request$ = this.editingId
      ? this.http.put<string>(url, this.clienteForm, { headers: this.getAuthHeaders() })
      : this.http.post<string>(url, this.clienteForm, { headers: this.getAuthHeaders() });

    request$.subscribe({
      next: () => {
        this.carregarClientes();
        this.closeModal();
      },
      error: err => {
        console.error('Erro Salvar:', err);
        this.errorMsg = this.editingId ? 'Erro ao atualizar cliente.' : 'Erro ao registrar cliente.';
      }
    });
  }

  editarCliente(cliente: Cliente): void {
    this.openModal(true, cliente);
  }

  excluirCliente(id: string): void {
    const cliente = this.clientes.find(c => c.id === id);
    if (!cliente) {
      this.errorMsg = 'Cliente não encontrado.';
      return;
    }
    if (cliente.viagem?.length) {
      this.errorMsg = 'Este cliente possui viagens e não pode ser excluído.';
      return;
    }
    this.http.delete<string>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders(), responseType: 'text' as 'json' })
      .subscribe({
        next: () => this.carregarClientes(),
        error: err => {
          console.error('Erro DELETE:', err);
          this.errorMsg = 'Erro ao excluir cliente.';
        }
      });
  }

  private clearForm(): void {
    this.editingId = null;
    this.clienteForm = { nome: '', cpfCnpj: '', telefone: '', endereco: '' };
  }
}

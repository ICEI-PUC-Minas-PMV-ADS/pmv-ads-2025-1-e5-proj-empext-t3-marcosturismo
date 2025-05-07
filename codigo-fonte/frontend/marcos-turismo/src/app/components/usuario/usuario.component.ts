import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment';

interface Usuario {
  id: string;
  nome: string;
  tipo: string;
  email: string;
  status: string;
  telefone?: string;
  categoria?: string;
  documento?: string;
}

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, SidebarComponent],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  private baseUrl = `${environment.apiUrl}/usuario`;

  usuarios: Usuario[] = [];
  isModalOpen = false;
  errorMsg: string | null = null;
  private editingId: string | null = null;

  // NOVO: controla o usuário selecionado no dropdown
  selectedUserId: string | null = null;

  usuarioForm: Partial<Usuario> = {
    nome: '',
    tipo: 'Administrador',
    email: '',
    status: 'Ativo',
    telefone: '',
    categoria: 'Administrador',
    documento: ''
  };

  constructor(private http: HttpClient, private cdref: ChangeDetectorRef) {}

  ngOnInit() {
    this.carregarUsuarios();
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

  carregarUsuarios(): void {
    this.http.get<Usuario[]>(`${this.baseUrl}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: data => {
          this.usuarios = Array.isArray(data) ? data : [];
          this.cdref.detectChanges();
          this.errorMsg = null;
        },
        error: err => {
          console.error('Erro GET:', err);
          this.errorMsg = 'Erro ao buscar usuários.';
        }
      });
  }

  salvar(): void {
    const url = this.editingId
      ? `${this.baseUrl}/${this.editingId}`
      : `${this.baseUrl}`;
    const request$ = this.editingId
      ? this.http.put<string>(url, this.usuarioForm, { headers: this.getAuthHeaders() })
      : this.http.post<string>(url, this.usuarioForm, { headers: this.getAuthHeaders() });

    request$.subscribe({
      next: () => {
        this.carregarUsuarios();
        this.clearForm();
      },
      error: err => {
        console.error('Erro Salvar:', err);
        this.errorMsg = this.editingId ? 'Erro ao atualizar usuário.' : 'Erro ao registrar usuário.';
      }
    });
  }

  // Método existente (usa quando clica em um card)
  editarUsuario(usuario: Usuario): void {
    this.editingId = usuario.id;
    this.usuarioForm = { ...usuario };
  }

  // NOVO: editar a partir do dropdown
  editarUsuarioSelecionado(): void {
    if (!this.selectedUserId) {
      return;
    }
    const usuario = this.usuarios.find(u => u.id === this.selectedUserId);
    if (usuario) {
      this.editarUsuario(usuario);
      this.isModalOpen = false;
    }
  }

  excluirUsuario(id: string): void {
    this.http.delete<string>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as 'json'
    }).subscribe({
      next: () => {
        this.carregarUsuarios();
        // se estiver usando dropdown, limpa seleção
        if (this.selectedUserId === id) {
          this.selectedUserId = null;
        }
      },
      error: err => {
        console.error('Erro DELETE:', err);
        this.errorMsg = 'Erro ao excluir usuário.';
      }
    });
  }

  clearForm(): void {
    this.editingId = null;
    this.usuarioForm = {
      nome: '',
      tipo: 'Administrador',
      email: '',
      status: 'Ativo',
      telefone: '',
      categoria: 'Administrador',
      documento: ''
    };
  }

  campoTemErro(campo: keyof Usuario): boolean {
    const valor = this.usuarioForm[campo];
    return typeof valor === 'string' && valor.trim().length === 0;
  }

  cadastrar(): void {
    this.salvar();
  }

  cancelar(): void {
    this.clearForm();
    console.log('❌ Cadastro cancelado');
  }
}

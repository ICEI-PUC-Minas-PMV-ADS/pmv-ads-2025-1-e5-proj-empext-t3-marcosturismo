
import { Component } from '@angular/core';

// frota.component.ts

import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Representa um veículo na frota.
 */
interface Veiculo {
  id?: string;
  numeracao: string;
  modelo: string;
  marca: string;
  anoModelo: string;
  kmAtual: number;
  situacao: 'Ativo' | 'Inativo' | 'Manutencao';
  placa: string;
  lotacao: number;
  categoria: 'Rodoviario' | 'Urbano';
  arCondicionado: boolean;
  wifi: boolean;
  poltronaReclinavel: boolean;
  tv: boolean;
  geladeira: boolean;
  sanitarios: boolean;
  imagem: string;
}

@Component({
  selector: 'app-frota',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent, HttpClientModule],
  templateUrl: './frota.component.html',
  styleUrls: ['./frota.component.css']
})
export class FrotaComponent implements OnInit {

  modalAberto = false;
  selectedCardIndex: number | null = null; // Variável para armazenar o índice do card selecionado

  // Campos do formulário
  numeracao = '';
  modelo = '';
  marca = '';
  anoModelo = '';
  kmAtual: number | '' = '';
  situacao: 'Ativo' | 'Inativo' | 'Manutencao' = 'Ativo';
  placa = '';
  lotacao: number | '' = '';
  categoria: 'Rodoviario' | 'Urbano' = 'Rodoviario';
  arCondicionado = false;
  wifi = false;
  poltronaReclinavel = false;
  tv = false;
  geladeira = false;
  sanitarios = false;

  imagemPreview = '';
  cardsGerados: Veiculo[] = [];
  errorMsg: string | null = null;

  private apiUrl = `${environment.apiUrl}/veiculo`;


  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.carregarFrota();
  }


  fecharModal() {
  // Campos do formulário
  numeracao = '';
  modelo = '';
  marca = '';
  anoModelo = '';
  kmAtual: number | '' = '';
  situacao: 'Ativo' | 'Inativo' | 'Manutencao' = 'Ativo';
  placa = '';
  lotacao: number | '' = '';
  categoria: 'Rodoviario' | 'Urbano' = 'Rodoviario';
  arCondicionado = false;
  wifi = false;
  poltronaReclinavel = false;
  tv = false;
  geladeira = false;
  sanitarios = false;
  imagemPreview = '';
  cardsGerados: Veiculo[] = [];
  errorMsg: string | null = null;
  mensagem: string = '';
  mensagemTipo: 'success' | 'error' | '' = '';

  private apiUrl = `${environment.apiUrl}/veiculo`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMsg = 'Usuário não autenticado.';
      return;
    }
    this.carregarFrota();
  }

  private getHttpOptions() {
    const rawToken = localStorage.getItem('token');
    if (!rawToken) throw new Error('Token ausente');

    const token = rawToken.startsWith('Bearer ') ? rawToken : `Bearer ${rawToken}`;
    return {
      headers: new HttpHeaders({ Authorization: token }),
      withCredentials: true
    };
  }

  carregarFrota(): void {
    let options;
    try { options = this.getHttpOptions(); } catch {
      this.errorMsg = 'Usuário não autenticado.';
      return;
    }
    this.http.get<Veiculo[]>(this.apiUrl, options).subscribe({
      next: lista => this.cardsGerados = Array.isArray(lista) ? lista : [],
      error: (err: HttpErrorResponse) => this.handleError(err, 'carregar frota')
    });
  }

  abrirModal(): void {
    this.modalAberto = true;
    this.errorMsg = null;
    this.mensagem = '';
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.resetarFormulario();

  private getHttpOptions() {
    const raw = localStorage.getItem('token') || localStorage.getItem('auth_token') || '';
    // evita prefixar “Bearer ” duas vezes, caso você já tenha salvo com prefixo
    const headerValue = raw.startsWith('Bearer ') ? raw : `Bearer ${raw}`;
    console.log('Enviando Authorization:', headerValue);
    return { headers: new HttpHeaders({ Authorization: headerValue }) };

  }
  

  carregarFrota(): void {
    let options;
    try { options = this.getHttpOptions(); } catch {
      this.errorMsg = 'Usuário não autenticado.';
      return;
    }
    this.http.get<Veiculo[]>(this.apiUrl, options).subscribe({
      next: lista => this.cardsGerados = Array.isArray(lista) ? lista : [],
      error: (err: HttpErrorResponse) => this.handleError(err, 'carregar frota')
    });
  }

  abrirModal(): void { this.modalAberto = true; }
  fecharModal(): void {
    this.modalAberto = false;
    this.resetarFormulario();
  }

  selecionarImagem(event: any): void {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e: any) => this.imagemPreview = e.target.result;
    reader.readAsDataURL(file);
  }

  gerarCard(): void {
    const novo: Veiculo = {
      numeracao: this.numeracao,
      modelo: this.modelo,
      marca: this.marca,
      anoModelo: this.anoModelo,
      kmAtual: Number(this.kmAtual),
      situacao: this.situacao,
      placa: this.placa,
      lotacao: Number(this.lotacao),
      categoria: this.categoria,
      arCondicionado: this.arCondicionado,
      wifi: this.wifi,
      poltronaReclinavel: this.poltronaReclinavel,
      tv: this.tv,
      geladeira: this.geladeira,
      sanitarios: this.sanitarios,
      imagem: this.imagemPreview
    };


    this.cardsGerados.push(card);

    let options;
    try { options = this.getHttpOptions(); } catch {
      this.errorMsg = 'Usuário não autenticado.';
      return;
    }

    this.http.post<Veiculo>(this.apiUrl, novo, options).subscribe({
      next: veic => this.cardsGerados.push(veic),
      error: (err: HttpErrorResponse) => this.handleError(err, 'salvar veículo')
    });

    this.fecharModal();
  }

  atualizarCard(index: number): void {
    const veiculo = this.cardsGerados[index];
    if (!veiculo.id) return;

    let options;
    try { options = this.getHttpOptions(); } catch {
      this.errorMsg = 'Usuário não autenticado.';
      return;
    }
    this.http.put<Veiculo>(`${this.apiUrl}/${veiculo.id}`, veiculo, options)
      .subscribe({ next: () => {}, error: (err: HttpErrorResponse) => this.handleError(err, 'atualizar veículo') });
  }

  excluirCard(index: number): void {
    const veiculo = this.cardsGerados[index];
    if (!veiculo.id) { this.cardsGerados.splice(index, 1); return; }
    if (!confirm('Confirma exclusão deste veículo?')) return;

    let options;
    try { options = this.getHttpOptions(); } catch {
      this.errorMsg = 'Usuário não autenticado.';
      return;
    }
    this.http.delete(`${this.apiUrl}/${veiculo.id}`, options)
      .subscribe({ next: () => this.cardsGerados.splice(index, 1), error: (err: HttpErrorResponse) => this.handleError(err, 'excluir veículo') });
  }

  private handleError(err: HttpErrorResponse, context: string) {
    console.error(`Erro ao ${context}:`, err);
    this.errorMsg = `Erro ao ${context}. ${err.status === 403 ? 'Acesso negado.' : ''}`;
    if (err.status === 403) alert('Acesso negado!');
  }

  private resetarFormulario(): void {
    this.numeracao = '';
    this.modelo = '';
    this.marca = '';
    this.anoModelo = '';
    this.kmAtual = '';
    this.situacao = 'Ativo';
    this.placa = '';
    this.lotacao = '';
    this.categoria = 'Rodoviario';
    this.arCondicionado = false;
    this.wifi = false;
    this.poltronaReclinavel = false;
    this.tv = false;
    this.geladeira = false;
    this.sanitarios = false;
    this.imagemPreview = '';
  }

    let options;
    try { options = this.getHttpOptions(); } catch {
      this.errorMsg = 'Usuário não autenticado.';
      return;
    }

    this.http.post<Veiculo>(this.apiUrl, novo, options).subscribe({
      next: veic => {
        this.cardsGerados.push(veic);
        this.mensagem = 'Veículo adicionado com sucesso!';
        this.mensagemTipo = 'success';
        this.carregarFrota(); // Recarrega os veículos salvos
        this.fecharModal();   // Fecha o modal e limpa o formulário
      
      },
      error: (err: HttpErrorResponse) => this.handleError(err, 'salvar veículo')
    });

    this.fecharModal();
  }

  atualizarCard(index: number): void {
    const veiculo = this.cardsGerados[index];
    if (!veiculo.id) return;

    let options;
    try { options = this.getHttpOptions(); } catch {
      this.errorMsg = 'Usuário não autenticado.';
      return;
    }

    this.http.put<Veiculo>(`${this.apiUrl}/${veiculo.id}`, veiculo, options)
      .subscribe({
        next: () => {
          this.mensagem = 'Veículo atualizado com sucesso!';
          this.mensagemTipo = 'success';
        },
        error: (err: HttpErrorResponse) => this.handleError(err, 'atualizar veículo')
      });
  }

  excluirCard(index: number): void {
    const veiculo = this.cardsGerados[index];
    if (!veiculo.id) {
      this.cardsGerados.splice(index, 1);
      return;
    }

    if (!confirm('Confirma exclusão deste veículo?')) return;

    let options;
    try { options = this.getHttpOptions(); } catch {
      this.errorMsg = 'Usuário não autenticado.';
      return;
    }

    this.http.delete(`${this.apiUrl}/${veiculo.id}`, options)
      .subscribe({
        next: () => {
          this.cardsGerados.splice(index, 1);
          this.mensagem = 'Veículo excluído com sucesso!';
          this.mensagemTipo = 'success';
        },
        error: (err: HttpErrorResponse) => this.handleError(err, 'excluir veículo')
      });
  }

  editarCard(index: number): void {
    const veiculo = this.cardsGerados[index];
    this.selectedCardIndex = index;

    // Preenche os campos do formulário com os dados do veículo
    this.numeracao = veiculo.numeracao;
    this.modelo = veiculo.modelo;
    this.marca = veiculo.marca;
    this.anoModelo = veiculo.anoModelo;
    this.kmAtual = veiculo.kmAtual;
    this.situacao = veiculo.situacao;
    this.placa = veiculo.placa;
    this.lotacao = veiculo.lotacao;
    this.categoria = veiculo.categoria;
    this.arCondicionado = veiculo.arCondicionado;
    this.wifi = veiculo.wifi;
    this.poltronaReclinavel = veiculo.poltronaReclinavel;
    this.tv = veiculo.tv;
    this.geladeira = veiculo.geladeira;
    this.sanitarios = veiculo.sanitarios;
    this.imagemPreview = veiculo.imagem; // Define a imagem no preview
    this.modalAberto = true; // Abre o modal para editar
  }

  private resetarFormulario(): void {
    this.numeracao = '';
    this.modelo = '';
    this.marca = '';
    this.anoModelo = '';
    this.kmAtual = '';
    this.situacao = 'Ativo';
    this.placa = '';
    this.lotacao = '';
    this.categoria = 'Rodoviario';
    this.arCondicionado = false;
    this.wifi = false;
    this.poltronaReclinavel = false;
    this.tv = false;
    this.geladeira = false;
    this.sanitarios = false;
    this.imagemPreview = '';
  }

  private handleError(err: HttpErrorResponse, contexto: string): void {
    console.error(`Erro ao ${contexto}:`, err);
    this.errorMsg = `Erro ao ${contexto}. ${err.status === 403 ? 'Acesso negado.' : ''}`;
    this.mensagem = `Erro ao ${contexto}.`;
    this.mensagemTipo = 'error';

    if (err.status === 403) alert('Acesso negado!');
  }
}

}


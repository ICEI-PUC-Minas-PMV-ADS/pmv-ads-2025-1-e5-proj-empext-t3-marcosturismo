import { Component } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-frota',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './frota.component.html',
  styleUrls: ['./frota.component.css']
})
export class FrotaComponent {
  modalAberto = false;
  selectedCardIndex: number | null = null; // Variável para armazenar o índice do card selecionado

  modeloVeiculo = '';
  passageiros = '';
  adicionais: string[] = [''];
  imagemPreview: string = '';
  cardsGerados: any[] = [];

  abrirModal() {
    this.modalAberto = true;
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
  }

  selecionarImagem(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagemPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  adicionarCampoAdicional() {
    this.adicionais.push('');
  }

  removerCampoAdicional(index: number) {
    this.adicionais.splice(index, 1);
  }

  gerarCard() {
    const card = {
      modelo: this.modeloVeiculo,
      passageiros: this.passageiros,
      imagem: this.imagemPreview,
      adicionais: this.adicionais.filter(item => item.trim() !== '')
    };

<<<<<<< Updated upstream
    this.cardsGerados.push(card);
    this.fecharModal();
  }

  excluirCard(index: number) {
    this.cardsGerados.splice(index, 1);
  }

  resetarFormulario() {
    this.modeloVeiculo = '';
    this.passageiros = '';
    this.adicionais = [''];
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

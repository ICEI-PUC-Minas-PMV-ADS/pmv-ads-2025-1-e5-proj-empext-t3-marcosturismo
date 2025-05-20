import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpClientModule,
  HttpResponse
} from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { environment } from '../../../environments/environment';

/**
 * Interface com o formato exato que o endpoint GET /excursao
 * retorna. Ajuste conforme o JSON do seu back‑end.
 */
interface ExcursaoApi {
  id?: string;
  titulo: string;
  descricao: string;
  dataExcursao?: number; // por exemplo, timestamp em milissegundos
  imagem?: string;       // URL da imagem ou null
}

/**
 * View model que o template espera (mesmo nome de propriedades do HTML).
 */
interface ExcursaoView {
  id?: string;
  nome: string;
  descricao: string;
  data: string;       // string formatada em "dd/mm/aaaa"
  imagem: string;     // URL ou placeholder
  mostrarInfo: boolean;
}

@Component({
  selector: 'app-excursoes2',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HttpClientModule],
  templateUrl: './excursoes2.component.html',
  styleUrls: ['./excursoes2.component.css']
})
export class Excursoes2Component implements OnInit {
  excursaoList: ExcursaoView[] = [];
  erro?: string;
  carregando = false;
  nenhumEncontrado = false;

  // Para GET público de todas as excursões:
  private baseUrl = `${environment.apiUrl}/excursao/upcoming?date=1742430548303`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarExcursoes();
  }

  carregarExcursoes(): void {
    this.carregando = true;
    this.erro = undefined;
    this.nenhumEncontrado = false;
    this.excursaoList = [];

    // Chamamos GET /excursao e observamos a resposta completa
    this.http
      .get<ExcursaoApi[] | null>(this.baseUrl, { observe: 'response' })
      .subscribe({
        next: (response: HttpResponse<ExcursaoApi[] | null>) => {
          this.carregando = false;

          // Se 204 ou body nulo, não há dados
          if (response.status === 204 || !response.body) {
            this.nenhumEncontrado = true;
            return;
          }

          // response.body é possivelmente um array de ExcursaoApi
          const listaApi = Array.isArray(response.body) ? response.body : [];

          if (!listaApi.length) {
            this.nenhumEncontrado = true;
            return;
          }

          // Convertemos cada ExcursaoApi para ExcursaoView
          this.excursaoList = listaApi.map(e => ({
            id: e.id,
            nome: e.titulo,
            descricao: e.descricao,
            data: e.dataExcursao
              ? new Date(e.dataExcursao).toLocaleDateString('pt-BR')
              : '—',
            imagem: e.imagem || 'assets/imagens/placeholder.jpg',
            mostrarInfo: false
          }));
        },
        error: (err: HttpErrorResponse) => {
          this.carregando = false;
          console.error('Erro ao carregar excursões:', err);
          if (err.status === 0) {
            this.erro = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
          } else {
            this.erro = `Erro ${err.status} ao listar excursões: ${err.message}`;
          }
        }
      });
  }

  mostrarDetalhes(excursao: ExcursaoView): void {
    excursao.mostrarInfo = !excursao.mostrarInfo;
  }
}

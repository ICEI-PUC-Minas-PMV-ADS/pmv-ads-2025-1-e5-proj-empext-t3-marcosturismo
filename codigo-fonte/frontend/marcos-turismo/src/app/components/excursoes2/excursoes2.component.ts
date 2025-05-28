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
 * Interface com o formato exato que o endpoint GET /excursao retorna.
 */
interface ExcursaoApi {
  id?: string;
  titulo: string;
  descricao: string;
  dataExcursao?: number;
  imgUrl?: string; // URL da imagem no backend
}

/**
 * Interface que representa como os dados serão exibidos no template.
 */
interface ExcursaoView {
  id?: string;
  nome: string;
  descricao: string;
  data: string;
  imgUrl: string;
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

  // Endpoint público das excursões
  private baseUrl = `${environment.apiUrl}/excursao/upcoming?date=${Date.now()}`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarExcursoes();
  }

  carregarExcursoes(): void {
    this.carregando = true;
    this.erro = undefined;
    this.nenhumEncontrado = false;
    this.excursaoList = [];

    this.http
      .get<ExcursaoApi[] | null>(this.baseUrl, { observe: 'response' })
      .subscribe({
        next: (response: HttpResponse<ExcursaoApi[] | null>) => {
          this.carregando = false;

          if (response.status === 204 || !response.body) {
            this.nenhumEncontrado = true;
            return;
          }

          const listaApi = Array.isArray(response.body) ? response.body : [];

          if (!listaApi.length) {
            this.nenhumEncontrado = true;
            return;
          }

          this.excursaoList = listaApi.map(e => ({
            id: e.id,
            nome: e.titulo,
            descricao: e.descricao,
            data: e.dataExcursao
              ? new Date(e.dataExcursao).toLocaleDateString('pt-BR')
              : '—',
            imgUrl: e.imgUrl ||  'assets/imagens/placeholder.jpg',
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

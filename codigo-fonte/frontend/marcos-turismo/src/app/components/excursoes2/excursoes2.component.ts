import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-excursoes2',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HttpClientModule],
  templateUrl: './excursoes2.component.html',
  styleUrls: ['./excursoes2.component.css']
})
export class Excursoes2Component implements OnInit {
  excursaoList: any[] = [];
  errorMsg: string | null = null;

  // Corrigido: removido o ?date= da baseUrl
  private baseUrl = `${environment.apiUrl}/excursao/upcoming`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarExcursoes();
  }

  carregarExcursoes(): void {
    const timestamp = Date.now(); // milissegundos

    // URL completa com o parâmetro ?date=
    const url = `${this.baseUrl}?date=${timestamp}`;

    this.http.get<any[]>(url).subscribe({
      next: data => {
        console.log('Resposta da API:', data);
        this.excursaoList = Array.isArray(data)
          ? data.map(e => ({
              nome: e.titulo,
              descricao: e.descricao,
              data: new Date(e.dataExcursao).toLocaleDateString(),
              roteiro: '',
              preco: 0,
              veiculos: [],
              imagem: e.imgUrl || 'assets/imagens/placeholder.jpg',
              mostrarInfo: false
            }))
          : [];
      },
      error: err => {
        console.error('Erro ao carregar excursões:', err);
        this.errorMsg = 'Erro ao carregar excursões.';
      }
    });
  }

  mostrarDetalhes(excursao: any): void {
    excursao.mostrarInfo = !excursao.mostrarInfo;
  }
}

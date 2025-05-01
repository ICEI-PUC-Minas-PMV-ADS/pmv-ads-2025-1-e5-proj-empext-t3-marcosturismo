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

export class Excursoes2Component {
  // Lista de excursões
  excursaoList = [
    {
      nome: "Excursão para a Praia",
      descricao: "Uma viagem relaxante para a praia.",
      data: "2025-05-10",
      roteiro: "Cidade A → Praia X",
      preco: 120.00,
      veiculos: [

        { nome: "Van", capacidade: 15, placa: "XYZ-5678", imagem: "logo.png" }

        { nome: "Van", capacidade: 15, placa: "XYZ-5678", imagem: "bus.jpg" } // Resolução do conflito, utilizando 'bus.jpg'

      ],
      mostrarInfo: false
    },
    {
      nome: "Excursão Cultural",
      descricao: "Conheça a história das nossas cidades!",
      data: "2025-06-15",
      roteiro: "Cidade B → Cidade C",
      preco: 200.00,
      veiculos: [

        { nome: "Ônibus Executivo", capacidade: 40, placa: "LMN-2345", imagem: "logo.png" }

        { nome: "Ônibus Executivo", capacidade: 40, placa: "LMN-2345", imagem: "bus.jpg" } // Resolução do conflito, utilizando 'bus.jpg'

      ],
      mostrarInfo: false
    },
    {
      nome: "Excursão Aventura",
      descricao: "Para os amantes de aventuras ao ar livre!",
      data: "2025-07-20",
      roteiro: "Cidade D → Montanhas Z",
      preco: 250.00,
      veiculos: [

        { nome: "Micro-ônibus", capacidade: 20, placa: "OPQ-6789", imagem: "logo.png" }

        { nome: "Micro-ônibus", capacidade: 20, placa: "OPQ-6789", imagem: "bus.jpg" } // Resolução do conflito, utilizando 'bus.jpg'

      ],
      mostrarInfo: false
    }
  ];

  // Método para alternar a exibição dos detalhes da excursão
  mostrarDetalhes(excursao: any) {
    excursao.mostrarInfo = !excursao.mostrarInfo;

  }
}


  }
}


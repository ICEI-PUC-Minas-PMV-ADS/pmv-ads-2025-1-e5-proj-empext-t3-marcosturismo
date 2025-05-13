import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { environment } from '../../../environments/environment';
// Caminho absoluto — funciona sem se preocupar com “../../…”


interface Veiculo {
  modelo: string;
  anoModelo: string;
  marca: string;
  lotacao: number;
  categoria: string;
  arCondicionado: boolean;
  wifi: boolean;
  poltronaReclinavel: boolean;
  tv: boolean;
  geladeira: boolean;
  sanitarios: boolean;
}

@Component({
  selector: 'app-frotas',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HttpClientModule],
  templateUrl: './frotas.component.html',
  styleUrls: ['./frotas.component.css']
})

export class FrotasComponent implements OnInit {
  private apiUrl = `${environment.apiUrl}/veiculo/frota`;
  frotas: Veiculo[] = [];
  erro?: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Veiculo[]>(this.apiUrl)
      .subscribe({
        next: veiculos => this.frotas = veiculos,
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao buscar veículos:', err);
          this.erro = 'Erro interno da API ao listar frotas';
        }
      });
  }
}
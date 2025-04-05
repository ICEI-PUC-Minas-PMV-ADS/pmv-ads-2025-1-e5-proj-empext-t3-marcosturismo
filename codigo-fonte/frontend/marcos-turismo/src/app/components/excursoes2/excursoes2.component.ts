import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import necessário
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-excursoes2',
  standalone: true,
  imports: [CommonModule, NavbarComponent], // ✅ Importa funcionalidades como *ngFor e *ngIf
  templateUrl: './excursoes2.component.html',
  styleUrls: ['./excursoes2.component.css']
})
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
        { nome: "Van", capacidade: 15, placa: "XYZ-5678", imagem: "logo.jpg" }
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
        { nome: "Ônibus Executivo", capacidade: 40, placa: "LMN-2345", imagem: "logo.jpg" }
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
        { nome: "Micro-ônibus", capacidade: 20, placa: "OPQ-6789", imagem: "logo.jpg" }
      ],
      mostrarInfo: false
    }
  ];

  // Método para alternar a exibição dos detalhes da excursão
  mostrarDetalhes(excursao: any) {
    excursao.mostrarInfo = !excursao.mostrarInfo;
  }
}

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
export class Excursoes2Component implements OnInit {
  excursao = {
    nome: "Excursão",
    descricao: "Uma viagem incrível!",
    data: "2025-04-02",
    roteiro: "Cidade A → Cidade B",
    preco: 150.00,
    veiculos: [
      {
        nome: "Micro-ônibus",
        capacidade: 30,
        placa: "ABC-1234",
        imagem: "excursao.jpg"
      },
      {
        nome: "Marcopolo G7 1200",
        capacidade: 46,
        placa: "DEF-5678",
        imagem: "excursao.jpg"
      }
    ]
  };

  ngOnInit(): void {}

  mostrarDetalhes(): void {
    console.log("Detalhes da excursão exibidos!");
  }
}

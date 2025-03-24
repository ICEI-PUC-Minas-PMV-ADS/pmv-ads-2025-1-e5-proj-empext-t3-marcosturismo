import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
[x: string]: any;
  constructor() {}

  ngOnInit(): void {
    // Inicialização do componente
  }
}

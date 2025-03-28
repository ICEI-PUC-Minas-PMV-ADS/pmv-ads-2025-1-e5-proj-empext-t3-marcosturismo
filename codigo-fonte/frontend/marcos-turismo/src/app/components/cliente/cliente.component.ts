// cliente.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

// Definindo uma interface para o tipo de card
interface Card {
  nome: string;
  documento: string;
  telefone: string;
  endereco: string;
  viagem: string;
}

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  isModalOpen = false;
  cliente = {
    nome: '',
    documento: '',
    telefone: '',
    endereco: '',
    viagem: ''
  };
  cards: Card[] = [];

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  cadastrar() {
    this.cards.push({...this.cliente});
    this.clearForm();
    this.closeModal();
  }

  cancelar() {
    this.clearForm();
    this.closeModal();
  }

  clearForm() {
    this.cliente = {
      nome: '',
      documento: '',
      telefone: '',
      endereco: '',
      viagem: ''
    };
  }

  editarCard(card: Card) {
    this.cliente = {...card};
    this.openModal();
  }

  excluirCard(card: Card) {
    const index = this.cards.indexOf(card);
    if (index > -1) {
      this.cards.splice(index, 1);
    }
  }
}

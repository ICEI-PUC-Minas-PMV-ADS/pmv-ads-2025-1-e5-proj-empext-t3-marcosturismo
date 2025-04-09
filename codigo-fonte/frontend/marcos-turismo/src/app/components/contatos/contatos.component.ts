import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contatos',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent {
  formData = {
    name: '',
    phone: '',  // Agora temos 'phone' em vez de 'email'
    message: ''
  };

  // Número de WhatsApp do destinatário (substitua com o número correto)
  phoneNumber = '5587991103345';  // Inclua o código do país e o número do WhatsApp

  onSubmit() {
    const { name, phone, message } = this.formData;

    // Criação da mensagem para o WhatsApp
    const whatsappMessage = `Nome: ${name}, \nTelefone: ${phone} \nMensagem:${message}`;

    // URL do WhatsApp com a mensagem codificada
    const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Abrir o WhatsApp no navegador
    window.open(whatsappUrl, '_blank');
  }
}

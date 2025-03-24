import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  usuario = {
    nome: '',
    status: '',
    categoria: '',
    documento: '',
    email: ''
  };

  camposComErro: string[] = [];

  // Método que verifica se um campo deve ficar vermelho
  campoTemErro(campo: string): boolean {
    return this.camposComErro.includes(campo);
  }

  cadastrar(): void {
    this.camposComErro = []; // Limpa os erros anteriores

    // Validação de cada campo
    if (!this.usuario.nome) this.camposComErro.push('nome');
    if (!this.usuario.status) this.camposComErro.push('status');
    if (!this.usuario.categoria) this.camposComErro.push('categoria');
    if (!this.usuario.documento) this.camposComErro.push('documento');
    if (!this.usuario.email) this.camposComErro.push('email');

    if (this.camposComErro.length > 0) {
      console.log('Preencha todos os campos!');
      return;
    }

    console.log('✅ Usuário cadastrado:', this.usuario);
  }

  cancelar(): void {
    this.usuario = {
      nome: '',
      status: '',
      categoria: '',
      documento: '',
      email: ''
    };

    // Marca todos os campos como erro visualmente
    this.camposComErro = ['nome', 'status', 'categoria', 'documento', 'email'];

    console.log('❌ Cadastro cancelado');
  }
}

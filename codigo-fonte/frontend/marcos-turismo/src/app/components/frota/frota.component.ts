import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-frota',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './frota.component.html',
  styleUrls: ['./frota.component.css']
})
export class FrotaComponent {
  modalAberto = false;

  modeloVeiculo = '';
  passageiros = '';
  adicionais: string[] = [''];
  imagemPreview: string = '';
  cardsGerados: any[] = [];

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.resetarFormulario();
  }

  selecionarImagem(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagemPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  adicionarCampoAdicional() {
    this.adicionais.push('');
  }

  removerCampoAdicional(index: number) {
    this.adicionais.splice(index, 1);
  }

  gerarCard() {
    const card = {
      modelo: this.modeloVeiculo,
      passageiros: this.passageiros,
      imagem: this.imagemPreview,
      adicionais: this.adicionais.filter(item => item.trim() !== '')
    };

    this.cardsGerados.push(card);
    this.fecharModal();
  }

  excluirCard(index: number) {
    this.cardsGerados.splice(index, 1);
  }

  resetarFormulario() {
    this.modeloVeiculo = '';
    this.passageiros = '';
    this.adicionais = [''];
    this.imagemPreview = '';
  }
}

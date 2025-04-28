import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-servico',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  salvar(
    placa: string,
    km: string,
    fornecedor: string,
    nota: string,
    ultimaTrocaOleo: string,
    kmUltimaTroca: string,
    valorOleo: string,
    proximaTrocaOleo: string,
    pastilhaFreio: string,
    valorPastilhaFreio: string,
    checkupMotor: string,
    valorCheckup: string
  ) {
    const dadosFormulario = {
      placa,
      km,
      fornecedor,
      nota,
      ultimaTrocaOleo,
      kmUltimaTroca,
      valorOleo,
      proximaTrocaOleo,
      pastilhaFreio,
      valorPastilhaFreio,
      checkupMotor,
      valorCheckup
    };

    console.log('Dados do formulário:', dadosFormulario);
    
    // Aqui você pode implementar a lógica de persistência (ex: chamar um serviço ou API)

    this.closeModal();
  }
}
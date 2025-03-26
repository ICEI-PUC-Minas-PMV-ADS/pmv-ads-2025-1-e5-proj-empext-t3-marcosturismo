import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-viagens',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './viagens.component.html',
  styleUrl: './viagens.component.css'
})
export class ViagensComponent {
  motorista: string = '';
  tipoServico: string = 'excursao';
  dataInicio: string = '';
  dataVolta: string = '';
  isModalVisible: boolean = false;
  imagePreview: string = 'placeholder.jpg';
  avarias: string = '';
  checklist = {
    pneus: false,
    farois: false,
    banheiro: false,
    luzes: false,
    geladeira: false,
    espacoMalas: false
  };

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit() {
    // Carregar dados do Local Storage (se existirem)
    this.motorista = localStorage.getItem('motorista') || '';
    this.tipoServico = localStorage.getItem('tipoServico') || 'excursao';
    this.dataInicio = localStorage.getItem('dataInicio') || '';
    this.dataVolta = localStorage.getItem('dataVolta') || '';
    this.avarias = localStorage.getItem('avarias') || '';
  }

  ngOnDestroy() {
    // Salvar dados no Local Storage
    localStorage.setItem('motorista', this.motorista);
    localStorage.setItem('tipoServico', this.tipoServico);
    localStorage.setItem('dataInicio', this.dataInicio);
    localStorage.setItem('dataVolta', this.dataVolta);
    localStorage.setItem('avarias', this.avarias);
  }
}
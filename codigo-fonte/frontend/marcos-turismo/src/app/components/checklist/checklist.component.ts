import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment';

interface Checklist {
  pneus: boolean;
  farois: boolean;
  banheiro: boolean;
  luzes: boolean;
  geladeira: boolean;
  espacoMalas: boolean;
}

interface Viagem {
  id: string;
  motorista: string;
  tipoServico: string;
  dataInicio: string;
  dataVolta: string;
}

interface ChecklistData {
  motorista: string;
  tipoServico: string;
  dataInicio: string;
  dataVolta: string;
  avarias: string;
  checklist: Checklist;
  image?: string;
}

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
})
export class ChecklistComponent implements OnInit, OnDestroy {
  // URLs da API baseadas no environment
  private readonly apiUrlViagem = `${environment.apiUrl}/viagem`;
  private readonly apiUrlChecklist = `${environment.apiUrl}/viagem/checklist`;

  // Dados de viagens e checklist
  viagens: Viagem[] = [];
  selectedViagemId: string = '';

  motorista = '';
  tipoServico = 'excursao';
  dataInicio = '';
  dataVolta = '';
  avarias = '';
  checklist: Checklist = {
    pneus: false,
    farois: false,
    banheiro: false,
    luzes: false,
    geladeira: false,
    espacoMalas: false,
  };

  imagePreview: string = 'placeholder.jpg';
  isModalVisible = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadViagens();
    }
  }

  ngOnDestroy(): void {}

  loadViagens(): void {
    this.http.get<Viagem[]>(this.apiUrlViagem).subscribe({
      next: (data) => (this.viagens = data),
      error: (err) => console.error('Erro ao carregar viagens:', err),
    });
  }

  onSelectViagem(): void {
    if (!this.selectedViagemId) {
      this.resetForm();
      return;
    }

    const viagem = this.viagens.find((v) => v.id === this.selectedViagemId);
    if (viagem) {
      this.motorista = viagem.motorista;
      this.tipoServico = viagem.tipoServico;
      this.dataInicio = viagem.dataInicio;
      this.dataVolta = viagem.dataVolta;
      this.avarias = '';
      this.resetChecklist();
      this.imagePreview = 'placeholder.jpg';
    }
  }

  openModal(): void {
    if (!this.selectedViagemId) {
      alert('Selecione uma viagem antes de abrir o checklist.');
      return;
    }
    this.onSelectViagem();
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  submitChecklist(): void {
    if (!this.selectedViagemId) {
      alert('Selecione uma viagem para enviar o checklist.');
      return;
    }

    const checklistData: ChecklistData = {
      motorista: this.motorista,
      tipoServico: this.tipoServico,
      dataInicio: this.dataInicio,
      dataVolta: this.dataVolta,
      avarias: this.avarias,
      checklist: this.checklist,
      image: this.imagePreview,
    };

    this.http.post(`${this.apiUrlChecklist}/${this.selectedViagemId}`, checklistData).subscribe({
      next: () => {
        alert('Checklist enviado com sucesso!');
        this.resetForm();
        this.selectedViagemId = '';
        this.closeModal();
      },
      error: (err) => {
        console.error('Erro ao enviar checklist:', err);
        alert('Erro ao enviar checklist: ' + err.message);
      },
    });
  }

  resetForm(): void {
    this.motorista = '';
    this.tipoServico = 'excursao';
    this.dataInicio = '';
    this.dataVolta = '';
    this.avarias = '';
    this.resetChecklist();
    this.imagePreview = 'placeholder.jpg';
  }

  resetChecklist(): void {
    this.checklist = {
      pneus: false,
      farois: false,
      banheiro: false,
      luzes: false,
      geladeira: false,
      espacoMalas: false,
    };
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}

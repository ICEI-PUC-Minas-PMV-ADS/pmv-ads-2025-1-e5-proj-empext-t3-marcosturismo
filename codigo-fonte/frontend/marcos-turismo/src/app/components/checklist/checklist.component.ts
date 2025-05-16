import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

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
  // Outros campos se precisar...
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
  viagens: Viagem[] = [];
  selectedViagemId: string = '';

  motorista: string = '';
  tipoServico: string = 'excursao';
  dataInicio: string = '';
  dataVolta: string = '';
  avarias: string = '';
  checklist: Checklist = {
    pneus: false,
    farois: false,
    banheiro: false,
    luzes: false,
    geladeira: false,
    espacoMalas: false,
  };
  imagePreview: string = 'placeholder.jpg';

  apiUrlViagem = 'http://localhost:8080/viagem';
  apiUrlChecklist = 'http://localhost:8080/viagem/checklist';

  isModalVisible: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadViagens();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      // Aqui você pode salvar estado no localStorage se quiser
    }
  }

  loadViagens() {
    this.http.get<Viagem[]>(this.apiUrlViagem).subscribe({
      next: (data) => {
        this.viagens = data;
      },
      error: (err) => {
        console.error('Erro ao carregar viagens:', err);
      }
    });
  }

  onSelectViagem() {
    if (!this.selectedViagemId) {
      this.resetForm();
      return;
    }

    const viagem = this.viagens.find(v => v.id === this.selectedViagemId);
    if (viagem) {
      this.motorista = viagem.motorista;
      this.tipoServico = viagem.tipoServico;
      this.dataInicio = viagem.dataInicio;
      this.dataVolta = viagem.dataVolta;
      this.avarias = '';
      this.checklist = {
        pneus: false,
        farois: false,
        banheiro: false,
        luzes: false,
        geladeira: false,
        espacoMalas: false,
      };
      this.imagePreview = 'placeholder.jpg';
    }
  }

  openModal() {
    if (!this.selectedViagemId) {
      alert('Selecione uma viagem antes de abrir o checklist.');
      return;
    }
    this.onSelectViagem();
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  submitChecklist() {
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

  resetForm() {
    this.motorista = '';
    this.tipoServico = 'excursao';
    this.dataInicio = '';
    this.dataVolta = '';
    this.avarias = '';
    this.checklist = {
      pneus: false,
      farois: false,
      banheiro: false,
      luzes: false,
      geladeira: false,
      espacoMalas: false,
    };
    this.imagePreview = 'placeholder.jpg';
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
}

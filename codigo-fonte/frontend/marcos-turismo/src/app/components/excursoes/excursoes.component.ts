import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  OnInit,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-excursoes',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './excursoes.component.html',
  styleUrls: ['./excursoes.component.css'],
})
export class ExcursoesComponent implements OnInit {
  hoje: string = new Date().toISOString().split('T')[0];

  excursoes: any[] = [];
  excursaoForm: any = {
    id: null,
    dataExcursao: '',
    titulo: '',
    descricao: '',
    // Não precisamos mais de imagemBase64 aqui, pois vamos enviar via FormData
  };
  showModal: boolean = false;
  editingId: string | null = null;
  errorMsg: string = '';
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  // Para abrir a janela de seleção de arquivo em cada card (edição inline)
  @ViewChildren('inputUpload') inputUploadElements!: QueryList<ElementRef>;

  // Em vez de armazenar base64, vamos armazenar o File que o usuário selecionou
  arquivoParaEnvio: File | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.buscarExcursoes();
  }

  // -----------------------------------------------------
  // 1. BUSCAR TODAS AS EXCURSÕES (GET /excursao)
  // -----------------------------------------------------
  buscarExcursoes(): void {
    const token = localStorage.getItem('token') || '';
    if (!token) {
      this.errorMsg = 'Não há token de autenticação.';
      return;
    }

    this.http
      .get<any[]>(`${environment.apiUrl}/excursao`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .subscribe({
        next: (data) => {
          // O backend retorna lista de Excursao, cada uma com: id, titulo, descricao, dataExcursao, imgUrl, etc.
          this.excursoes = data.map((e) => ({
            ...e,
            isNew: false,
          }));
        },
        error: (err) => {
          console.error('Erro ao chamar GET /excursao:', err);
          this.errorMsg = 'Erro ao carregar excursões.';
        },
      });
  }

  // -----------------------------------------------------
  // 2. ABRIR FORMULÁRIO DE NOVA EXCURSÃO
  //    Insere um "card vazio" no topo, com isNew = true
  // -----------------------------------------------------
  adicionarCard(): void {
    this.excursoes.unshift({
      id: null,
      dataExcursao: '',
      titulo: '',
      descricao: '',
      imgUrl: '',
      isNew: true,
      arquivo: null, // guardaremos aqui o File até o confirm
      imagePreview: null,
      selectedFile: null,
    });
  }

  cancelarCard(index: number): void {
    this.excursoes.splice(index, 1);
  }

  // -----------------------------------------------------
  // 3. CONFIRMAR CRIAÇÃO OU EDIÇÃO INLINE (sem modal)
  //    Envia multipart/form-data para POST /excursao ou PUT /excursao/{id}
  // -----------------------------------------------------
  confirmarCard(index: number): void {
    const card = this.excursoes[index];
    const token = localStorage.getItem('token') || '';
    if (!token) {
      this.errorMsg = 'Usuário não autenticado.';
      return;
    }

    // Validações mínimas:
    if (!card.titulo || !card.dataExcursao || !card.descricao) {
      this.errorMsg = 'Todos os campos obrigatórios devem ser preenchidos.';
      return;
    }

    // Monta FormData:
    const formData = new FormData();
    formData.append('titulo', card.titulo);
    formData.append('descricao', card.descricao);
    // O backend espera 'dataExcursao' como string (milissegundos desde Epoch). Convertamos:
    // card.dataExcursao é no formato YYYY-MM-DD => transformamos em timestamp:
    const dataMillis = new Date(card.dataExcursao).getTime().toString();
    formData.append('dataExcursao', dataMillis);

    // Se o usuário selecionou arquivo (no card.arquivo), enviamos:
    if (this.selectedFile) {
      formData.append(
        'file',
        this.selectedFile,
        this.selectedFile.name
      );
    }

    // Escolhe o método POST ou PUT:
    let req$;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (card.id) {
      // Edição de existente
      req$ = this.http.put(
        `${environment.apiUrl}/excursao/${card.id}`,
        formData,
        { headers, responseType: 'text' as const }
      );
    } else {
      // Nova excursão
      req$ = this.http.post(`${environment.apiUrl}/excursao`, formData, {
        headers, responseType: 'text' as const
      });
    }

    req$.subscribe({
      next: () => {
        // Recarrega a lista após sucesso
        this.buscarExcursoes();
      },
      error: (err) => {
        console.error('Erro ao salvar excursão:', err);
        this.errorMsg = 'Erro ao salvar excursão.';
      },
    });
  }

  // -----------------------------------------------------
  // 4. CAPTURAR ARQUIVO QUANDO O USUÁRIO CLICA NO INPUT DE UM CARD
  // -----------------------------------------------------
  selecionarImagem(event: any, index: number): void {
    const file: File = event.target.files[0];
    if (file) {
      // Validações básicas de tamanho e tipo (mesmo que o backend valide novamente)
      if (file.size > 10 * 1024 * 1024) {
        this.errorMsg = 'Imagem excede 10MB.';
        return;
      }
      const tipo = file.type;
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(tipo)) {
        this.errorMsg = 'Formato de imagem não suportado.';
        return;
      }

      this.selectedFile = file;
      // Faz preview da imagem
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      // Opcional: poderíamos mostrar uma prévia local usando FileReader, mas não é estritamente necessário
    }
  }

  // -----------------------------------------------------
  // 5. ABRIR SELETOR DE ARQUIVO VIA botão "Carregar Imagem" de cada card
  // -----------------------------------------------------
  abrirUpload(index: number): void {
    const input = this.inputUploadElements.toArray()[index].nativeElement;
    input.click();
  }

  // -----------------------------------------------------
  // 6. EXCLUIR EXCURSÃO (DELETE /excursao/{id})
  // -----------------------------------------------------
  excluirExcursao(id: string): void {
    if (!confirm('Tem certeza que deseja excluir esta excursão?')) {
      return;
    }

    const token = localStorage.getItem('token') || '';
    if (!token) {
      this.errorMsg = 'Usuário não autenticado.';
      return;
    }

    this.http
      .delete(`${environment.apiUrl}/excursao/${id}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
        responseType: 'text' as const,
      })
      .subscribe({
        next: () => this.buscarExcursoes(),
        error: (err) => {
          console.error('Erro ao excluir excursão:', err);
          this.errorMsg = 'Erro ao excluir excursão.';
        },
      });
  }

  // -----------------------------------------------------
  // 7. ABRIR FORMULÁRIO DE EDIÇÃO EM MODAL
  //    (Preenche excursaoForm e exibe modal separado)
  // -----------------------------------------------------
  editarExcursao(excursao: any): void {
    // Preenche formulários (sem imagem, pois a imagem já está salva no servidor)
    this.excursaoForm = {
      id: excursao.id,
      dataExcursao: new Date(excursao.dataExcursao).toISOString().split('T')[0],
      titulo: excursao.titulo,
      descricao: excursao.descricao,
    };
    this.editingId = excursao.id;
    this.showModal = true;
    this.arquivoParaEnvio = null; // caso o usuário deseje trocar a imagem via modal
  }

  // -----------------------------------------------------
  // 8. SALVAR VIA MODAL (POST ou PUT, muito parecido com confirmarCard)
  // -----------------------------------------------------
  salvar(): void {
    if (
      !this.excursaoForm.titulo ||
      !this.excursaoForm.dataExcursao ||
      !this.excursaoForm.descricao
    ) {
      this.errorMsg = 'Todos os campos obrigatórios devem ser preenchidos.';
      return;
    }

    const token = localStorage.getItem('token') || '';
    if (!token) {
      this.errorMsg = 'Usuário não está autenticado.';
      return;
    }

    const formData = new FormData();
    formData.append('titulo', this.excursaoForm.titulo);
    formData.append('descricao', this.excursaoForm.descricao);
    const dataMillis = new Date(this.excursaoForm.dataExcursao)
      .getTime()
      .toString();
    formData.append('dataExcursao', dataMillis);

    // Se o usuário escolheu trocar a imagem no modal
    if (this.arquivoParaEnvio) {
      formData.append(
        'file',
        this.arquivoParaEnvio,
        this.arquivoParaEnvio.name
      );
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let req$;
    if (this.editingId) {
      req$ = this.http.put(
        `${environment.apiUrl}/excursao/${this.editingId}`,
        formData,
        { headers, responseType: 'text' as const }
      );
    } else {
      req$ = this.http.post(`${environment.apiUrl}/excursao`, formData,
        { headers, responseType: 'text' as const });
    }

    req$.subscribe({
      next: () => {
        this.closeModal();
        this.buscarExcursoes();
      },
      error: (err) => {
        console.error('Erro ao salvar excursão via modal:', err);
        this.errorMsg = 'Erro ao salvar excursão.';
      },
    });
  }

  // -----------------------------------------------------
  // 9. CAPTURAR ARQUIVO NO MODAL
  // -----------------------------------------------------
  onFileChangeModal(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        this.errorMsg = 'Imagem excede 10MB.';
        return;
      }
      const tipo = file.type;
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(tipo)) {
        this.errorMsg = 'Formato de imagem não suportado.';
        return;
      }
      this.arquivoParaEnvio = file;
    }
  }

  // -----------------------------------------------------
  // 10. FECHAR MODAL
  // -----------------------------------------------------
  closeModal(): void {
    this.showModal = false;
    this.editingId = null;
    this.excursaoForm = {
      id: null,
      dataExcursao: '',
      titulo: '',
      descricao: '',
    };
    this.selectedFile = null;
    this.arquivoParaEnvio = null;
  }

  // -----------------------------------------------------
  // 11. RETORNA A URL DA IMAGEM (já que o backend devolve imgUrl)
  // -----------------------------------------------------
  getImagemSrc(excursao: any): string | null {
    return excursao.imgUrl || null;
  }
}
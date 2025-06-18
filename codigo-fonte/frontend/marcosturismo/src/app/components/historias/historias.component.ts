import { AfterViewChecked, Component, ElementRef, Inject, NgZone, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-historias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.css']
})
export class HistoriasComponent implements OnInit, AfterViewChecked {

  @ViewChild('carouselContainer') carousel?: ElementRef<HTMLElement>;
  showNavButtons = false;
  avaliacoes: any[] = [
  ];

  currentAvaliacaoIndex = 0;
  notaMedia = 0;
  Math = Math;
  enviando = false;
  showSnackbar = false;
  mensagemErro = '';

  form!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.form = this.fb.group({
      autor: ['', [Validators.required, Validators.maxLength(255)]],
      titulo: ['', [Validators.required, Validators.maxLength(255)]],
      descricao: ['', [Validators.required, Validators.maxLength(255)]],
      nota: [null, [Validators.required]],
    });

    this.loadAvaliacoesCards();
  }


  loadAvaliacoesCards() {
    const url = `${environment.apiUrl}/avaliacao/validas`;
    this.http.get<any[]>(url).subscribe({
      next: data => {
        data.forEach(art => {
          this.avaliacoes.push(art);
        });
      },
      error: err => console.error('Erro ao buscar excursões', err)
    });
  }

  private observerInitialized = false;

  ngAfterViewChecked(): void {
    if (!this.observerInitialized && isPlatformBrowser(this.platformId)) {
      if (this.carousel?.nativeElement) {
        this.observerInitialized = true;

        this.ngZone.runOutsideAngular(() => {
          const observer = new ResizeObserver(() => this.checkOverflow());
          observer.observe(this.carousel!.nativeElement);
        });
      }
    }
  }

  scrollCarousel(direction: 'left' | 'right') {
    const container = this.carousel?.nativeElement as HTMLElement;
    const scrollAmount = container.offsetWidth * 0.9; // scrolla quase uma "página" inteira

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  }

  checkOverflow() {
    const container = this.carousel?.nativeElement as HTMLElement;

    const hasOverflow = container.scrollWidth > container.clientWidth;

    // Verifica se estamos em um dispositivo largo (desktop)
    const isDesktop = window.innerWidth > 768;

    // Seta as setas de navegação apenas se estiver no desktop E houver overflow
    this.ngZone.run(() => {
      this.showNavButtons = isDesktop && hasOverflow;
    });

  }

  hover = 0;

  getStarFillPercent(index: number): number {
    const ref = this.hover || this.form.get('nota')?.value || 0;
    const diff = ref - index;

    if (diff >= 0) return 100;
    if (diff >= -0.5) return 50;
    return 0;
  }

  setNota(valor: number) {
    this.form.get('nota')?.setValue(valor);
  }


  enviarAvaliacao() {
    if (this.form.invalid) return;

    this.enviando = true;
    this.mensagemErro = '';

    const payload = {
      ...this.form.value,
      dataPublicacao: new Date().getTime()
    };


    this.http.post(`${environment.apiUrl}/avaliacao`, payload).subscribe({
      next: () => {
        this.form.reset();
        this.showSnackbar = true;
        this.enviando = false;

        // Esconde o snackbar após 4 segundos
        setTimeout(() => {
          this.showSnackbar = false;
        }, 4000);
      },
      error: err => {
        this.enviando = false;

        // TRATAMENTO PERSONALIZADO
        if (err.status === 403) {
          this.mensagemErro = '❌ Acesso negado. Sua avaliação não pôde ser enviada.';
        } else if (err.status === 400) {
          this.mensagemErro = '⚠️ Dados inválidos. Verifique os campos e tente novamente.';
        } else if (err.status === 0) {
          this.mensagemErro = '🌐 Não foi possível conectar ao servidor. Verifique sua conexão.';
        } else {
          this.mensagemErro = '❌ Ocorreu um erro inesperado. Tente novamente mais tarde.';
        }

        // Limpa o erro após 6 segundos
        setTimeout(() => {
          this.mensagemErro = '';
        }, 6000);

        console.error('Erro ao enviar avaliação:', err);
      }
    });
  }
}

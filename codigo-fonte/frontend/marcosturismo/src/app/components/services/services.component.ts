import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit, Inject, PLATFORM_ID, AfterViewChecked } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, AfterViewChecked {
  @ViewChild('carouselContainer') carousel?: ElementRef<HTMLElement>;
  servicos: any[] = [];
  constructor(private http: HttpClient, private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object) { }
  excursaoCards: any[] = [];
  showNavButtons = false;

  ngOnInit() {
    this.servicos = [
      {
        titulo: 'Fretamento',
        descricao: 'Utilizado pela maioria de nossos clientes, este serviço tem sido essencial para nosso sucesso. Quando se trata dos nossos serviços, você pode contar conosco para cuidar de cada uma das suas necessidades. Temos orgulho do nosso excelente serviço ao cliente e garantimos: você ficará muito satisfeito com o trabalho da nossa equipe.',
        imagem: 'fretamento.png',
      },
      {
        titulo: 'Receptivo',
        descricao: 'Queremos que nossos clientes experimentem o incrível nível de profissionalismo. Todos os nossos serviços, particularmente este, existem para proporcionar uma vida mais fácil e tranquila , assim como um serviço ao cliente de altíssima qualidade. Entre em contato para saber mais.',
        imagem: 'receptivo.png',
      },
      {
        titulo: 'Excursões',
        descricao: 'Este é um dos nossos serviços mais populares. Ele fez a diferença para muitos de nossos clientes e é oferecido com o mais alto nível de excelência. .',
        imagem: 'excursao.png',
      },
    ];

    this.loadExcursaoCards();
  }

  verMais(titlo: string) {
    // Criação da mensagem para o WhatsApp
    const whatsappMessage = `Olá! Gostaria de mais informações do serviço de ${titlo}`;

    // URL do WhatsApp com a mensagem codificada
    const whatsappUrl = `https://wa.me/${environment.phoneMarcos}?text=${encodeURIComponent(whatsappMessage)}.`;

    // Abrir o WhatsApp no navegador
    window.open(whatsappUrl, '_blank');
  }

  loadExcursaoCards() {
    const url = `${environment.apiUrl}/excursao/upcoming?date=${Date.now()}`;
    this.http.get<any[]>(url).subscribe({
      next: data => this.excursaoCards = data,
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
    const scrollAmount = container.offsetWidth * 0.8; // scrolla quase uma "página" inteira

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

    console.log(this.showNavButtons);
  }
}

import { Component, ElementRef, Inject, NgZone, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-frota',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './frota.component.html',
  styleUrls: ['./frota.component.css']
})
export class FrotaComponent implements OnInit {
  @ViewChild('carousel46') carousel46?: ElementRef<HTMLElement>;
  @ViewChild('carousel32') carousel32?: ElementRef<HTMLElement>;
  @ViewChild('carousel20') carousel20?: ElementRef<HTMLElement>;
  @ViewChild('carousel15') carousel15?: ElementRef<HTMLElement>;
  @ViewChild('carousel00') carousel00?: ElementRef<HTMLElement>;

  veiculos_46_mais: any[] = [];
  veiculos_32_45: any[] = [];
  veiculos_20_31: any[] = [];
  veiculos_15_19: any[] = [];
  veiculos_outros: any[] = [];

  constructor(private http: HttpClient, private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  showNavButtons46 = false;
  showNavButtons32 = false;
  showNavButtons20 = false;
  showNavButtons15 = false;
  showNavButtons00 = false;

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/veiculo/frota`).subscribe(res => {
      res.forEach(veiculo => {
        const lotacao = veiculo.lotacao;

        if (lotacao >= 46) {
          this.veiculos_46_mais.push(veiculo);
        } else if (lotacao >= 32 && lotacao < 46) {
          this.veiculos_32_45.push(veiculo);
        } else if (lotacao >= 20 && lotacao < 32) {
          this.veiculos_20_31.push(veiculo);
        } else if (lotacao >= 15 && lotacao < 20) {
          this.veiculos_15_19.push(veiculo);
        } else if (lotacao < 15) {
          this.veiculos_outros.push(veiculo);
        }
      });
    });
  }

  private observerInitialized = false;

  ngAfterViewChecked(): void {
    if (!this.observerInitialized && isPlatformBrowser(this.platformId)) {
      // Carrossel para 46 veículos
      if (this.carousel46?.nativeElement) {
        this.observerInitialized = true;

        this.ngZone.runOutsideAngular(() => {
          const observer = new ResizeObserver(() => this.checkOverflow46());
          observer.observe(this.carousel46!.nativeElement);
        });
      }

      // Carrossel para 32 veículos
      if (this.carousel32?.nativeElement) {
        this.observerInitialized = true;

        this.ngZone.runOutsideAngular(() => {
          const observer = new ResizeObserver(() => this.checkOverflow32());
          observer.observe(this.carousel32!.nativeElement);
        });
      }

      // Carrossel para 20 veículos
      if (this.carousel20?.nativeElement) {
        this.observerInitialized = true;

        this.ngZone.runOutsideAngular(() => {
          const observer = new ResizeObserver(() => this.checkOverflow20());
          observer.observe(this.carousel20!.nativeElement);
        });
      }

      // Carrossel para 15 veículos
      if (this.carousel15?.nativeElement) {
        this.observerInitialized = true;

        this.ngZone.runOutsideAngular(() => {
          const observer = new ResizeObserver(() => this.checkOverflow15());
          observer.observe(this.carousel15!.nativeElement);
        });
      }

      // Carrossel para 00 veículos
      if (this.carousel00?.nativeElement) {
        this.observerInitialized = true;

        this.ngZone.runOutsideAngular(() => {
          const observer = new ResizeObserver(() => this.checkOverflow00());
          observer.observe(this.carousel00!.nativeElement);
        });
      }


    }
  }


  /// Carrossel para 46 veiculos
  scrollCarousel46(direction: 'left' | 'right') {
    const container = this.carousel46?.nativeElement as HTMLElement;
    const scrollAmount = container.offsetWidth * 0.8;

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  }

  /// Carrossel para 32 veiculos
  scrollCarousel32(direction: 'left' | 'right') {
    const container = this.carousel32?.nativeElement as HTMLElement;
    const scrollAmount = container.offsetWidth * 0.8;

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  }
  /// Carrossel para 20 veiculos
  scrollCarousel20(direction: 'left' | 'right') {
    const container = this.carousel20?.nativeElement as HTMLElement;
    const scrollAmount = container.offsetWidth * 0.8;

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  }
  /// Carrossel para 15 veiculos
  scrollCarousel15(direction: 'left' | 'right') {
    const container = this.carousel15?.nativeElement as HTMLElement;
    const scrollAmount = container.offsetWidth * 0.8;

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  }
  /// Carrossel para 00 veiculos
  scrollCarousel00(direction: 'left' | 'right') {
    const container = this.carousel00?.nativeElement as HTMLElement;
    const scrollAmount = container.offsetWidth * 0.8;

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  }

  /// Olha se deu overflow para sumir com as setas para 46 veiculos
  checkOverflow46() {
    const container = this.carousel46?.nativeElement as HTMLElement;

    const hasOverflow = container.scrollWidth > container.clientWidth;

    // Verifica se estamos em um dispositivo largo (desktop)
    const isDesktop = window.innerWidth > 768;

    // Seta as setas de navegação apenas se estiver no desktop E houver overflow
    this.ngZone.run(() => {
      this.showNavButtons46 = isDesktop && hasOverflow;
    });

  }


  /// Olha se deu overflow para sumir com as setas para 32 veiculos
  checkOverflow32() {
    const container = this.carousel32?.nativeElement as HTMLElement;

    const hasOverflow = container.scrollWidth > container.clientWidth;

    // Verifica se estamos em um dispositivo largo (desktop)
    const isDesktop = window.innerWidth > 768;

    // Seta as setas de navegação apenas se estiver no desktop E houver overflow
    this.ngZone.run(() => {
      this.showNavButtons32 = isDesktop && hasOverflow;
    });


  }

  /// Olha se deu overflow para sumir com as setas para 20 veiculos
  checkOverflow20() {
    const container = this.carousel20?.nativeElement as HTMLElement;

    const hasOverflow = container.scrollWidth > container.clientWidth;

    // Verifica se estamos em um dispositivo largo (desktop)
    const isDesktop = window.innerWidth > 768;

    // Seta as setas de navegação apenas se estiver no desktop E houver overflow
    this.ngZone.run(() => {
      this.showNavButtons20 = isDesktop && hasOverflow;
    });


  }

  /// Olha se deu overflow para sumir com as setas para 15 veiculos
  checkOverflow15() {
    const container = this.carousel15?.nativeElement as HTMLElement;

    const hasOverflow = container.scrollWidth > container.clientWidth;

    // Verifica se estamos em um dispositivo largo (desktop)
    const isDesktop = window.innerWidth > 768;

    // Seta as setas de navegação apenas se estiver no desktop E houver overflow
    this.ngZone.run(() => {
      this.showNavButtons15 = isDesktop && hasOverflow;
    });


  }

  /// Olha se deu overflow para sumir com as setas para 00 veiculos
  checkOverflow00() {
    const container = this.carousel00?.nativeElement as HTMLElement;

    const hasOverflow = container.scrollWidth > container.clientWidth;

    // Verifica se estamos em um dispositivo largo (desktop)
    const isDesktop = window.innerWidth > 768;

    // Seta as setas de navegação apenas se estiver no desktop E houver overflow
    this.ngZone.run(() => {
      this.showNavButtons00 = isDesktop && hasOverflow;
    });


  }

  getCardBackgroundStyle(card: any): any {
    if (card?.imagens?.length) {
      return {
        'background-image': `url(${card.imagens[0]})`,
        'background-size': 'cover',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
      };
    }
    return {}; // vazio se não tiver imagem
  }
}

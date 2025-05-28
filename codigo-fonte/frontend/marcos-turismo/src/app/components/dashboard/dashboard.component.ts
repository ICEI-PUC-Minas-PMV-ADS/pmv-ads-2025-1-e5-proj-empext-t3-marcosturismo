import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment';
import { of, throwError, timer } from 'rxjs';
import { catchError, retryWhen, delayWhen, take } from 'rxjs/operators';

// Interfaces para tipagem conforme documentação dos endpoints

interface TipoServico {
  id: string;
  descricao: string;
  dataCriacao?: string;
}

interface ServicoRealizado {
  tipoServicoId: string;
  custo: number;
}

interface Servico {
  id?: string;
  dataServico: string;
  kmVeiculo: number;
  kmProxTrocaOleo: number;
  kmProxTrocaPneu: number;
  descricao: string;
  veiculoId: string;
  servicosRealizados: ServicoRealizado[];
  tipoServico?: TipoServico; // Opcional, caso o backend inclua
}

interface Gastos {
  [month: string]: number;
}

// Ajuste da interface para “manutenções pendentes” conforme JSON retornado
interface PendingMaintenance {
  id: string;
  numeracao: string;
  modelo: string;
  marca: string;
  anoModelo: string;
  kmAtual: number;
  situacao: string;
  kmProxTrocaOleo: number;
  kmProxTrocaPneu: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  errorMsg: string = '';
  isSidebarActive: boolean = true;
  activeVehicles: number = 0;
  pendingMaintenances: PendingMaintenance[] = [];
  maintenanceCosts: Gastos = {};
  fuelCosts: Gastos = {}; // Mantivemos, embora nos exemplos não tenha vindo rota de “gastos-abastecimento”
  servicos: Servico[] = [];

  private maintenanceChart: Chart | undefined;
  private fuelChart: Chart | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Inicializa os dados do dashboard.
   */
  private loadData(): void {
    this.loadMaintenanceCosts();
    this.loadFuelCosts();
    this.loadActiveVehicles();
    this.loadPendingMaintenances();
  }

  /**
   * Obtém os headers de autenticação.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMsg = 'Usuário não autenticado. Faça login novamente.';
      console.warn('Token não encontrado');
      // Retornar cabeçalho vazio para evitar undefined
      return new HttpHeaders();
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  /**
   * Carrega os custos de manutenção (últimos 6 meses).
   * Em caso de erro, retorna um objeto com todos os meses mapeados para 0.
   */
  private loadMaintenanceCosts(): void {
    const headers = this.getAuthHeaders();
    this.http.get<Gastos>(`${environment.apiUrl}/dashboard/gastos-manutencao`, { headers })
      .pipe(
        retryWhen(errors => errors.pipe(delayWhen(() => timer(1000)), take(3))),
        catchError(error => {
          this.errorMsg = 'Falha ao carregar custos de manutenção. Valores definidos como zero.';
          console.error('Erro ao carregar gastos de manutenção:', error);
          // Retorna um objeto vazio — mas depois de subscribir fazemos merge nos meses ausentes
          return of({});
        })
      )
      .subscribe({
        next: (response) => {
          // Se vier vazio ou parcialmente vazio, vamos preencher com 0 para os 6 meses correntes.
          const filledGastos = this.fillLastSixMonthsWithZero(response);
          this.maintenanceCosts = filledGastos;
          const months = Object.keys(filledGastos);
          const values = Object.values(filledGastos).map(Number);
          this.updateMaintenanceChart(months, values);
        }
      });
  }

  /**
   * Carrega os custos de abastecimento (últimos 6 meses).
   * Em caso de erro, retorna um objeto com todos os meses mapeados para 0.
   */
  private loadFuelCosts(): void {
    const headers = this.getAuthHeaders();
    this.http.get<Gastos>(`${environment.apiUrl}/dashboard/gastos-abastecimento`, { headers })
      .pipe(
        retryWhen(errors => errors.pipe(delayWhen(() => timer(1000)), take(3))),
        catchError(error => {
          this.errorMsg = 'Falha ao carregar custos de abastecimento. Valores definidos como zero.';
          console.error('Erro ao carregar gastos com abastecimento:', error);
          return of({});
        })
      )
      .subscribe({
        next: (response) => {
          const filledGastos = this.fillLastSixMonthsWithZero(response);
          this.fuelCosts = filledGastos;
          const months = Object.keys(filledGastos);
          const values = Object.values(filledGastos).map(Number);
          this.updateFuelChart(months, values);
        }
      });
  }

  /**
   * Preenche os últimos seis meses (no formato MM-YYYY) com 0 caso estejam ausentes no objeto dado.
   */
  private fillLastSixMonthsWithZero(partial: Gastos): Gastos {
    const result: Gastos = {};
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const dt = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const mm = String(dt.getMonth() + 1).padStart(2, '0');
      const yyyy = dt.getFullYear();
      const key = `${mm}-${yyyy}`;
      result[key] = partial[key] !== undefined ? partial[key] : 0;
    }
    return result;
  }

  /**
   * Carrega o número de veículos ativos.
   * Em caso de erro, retorna 0.
   */
  private loadActiveVehicles(): void {
    const headers = this.getAuthHeaders();
    this.http.get<number>(`${environment.apiUrl}/dashboard/veiculos-ativos`, { headers })
      .pipe(
        retryWhen(errors => errors.pipe(delayWhen(() => timer(1000)), take(3))),
        catchError(error => {
          this.errorMsg = 'Falha ao carregar veículos ativos. Valor definido como zero.';
          console.error('Erro ao carregar veículos ativos:', error);
          return of(0);
        })
      )
      .subscribe({
        next: (response) => {
          this.activeVehicles = response;
        }
      });
  }

  /**
   * Carrega as manutenções pendentes.
   * Em caso de erro, retorna array vazio.
   */
  private loadPendingMaintenances(): void {
    const headers = this.getAuthHeaders();
    this.http.get<PendingMaintenance[]>(`${environment.apiUrl}/dashboard/manutencoes-pendentes`, { headers })
      .pipe(
        retryWhen(errors => errors.pipe(delayWhen(() => timer(1000)), take(3))),
        catchError(error => {
          this.errorMsg = 'Falha ao carregar manutenções pendentes. Lista ficará vazia.';
          console.error('Erro ao carregar manutenções pendentes:', error);
          return of([]);
        })
      )
      .subscribe({
        next: (response) => {
          this.pendingMaintenances = response;
        }
      });
  }

  /**
   * Carrega um tipo de serviço específico (usado para mapear tipoServicoId).
   */
  loadTipoServico(tipoId: string): void {
    const headers = this.getAuthHeaders();
    this.http.get<TipoServico>(`${environment.apiUrl}/servico/tipo_servico/${tipoId}`, { headers })
      .pipe(
        retryWhen(errors => errors.pipe(delayWhen(() => timer(1000)), take(3))),
        catchError(error => {
          this.errorMsg = `Falha ao buscar tipo de serviço com ID ${tipoId}. Tente novamente.`;
          console.error('Erro ao buscar tipo de serviço:', error);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Tipo de Serviço:', response);
        }
      });
  }

  /**
   * Atualiza o gráfico de custos de manutenção.
   */
  private updateMaintenanceChart(months: string[], values: number[]): void {
    const ctx = (document.getElementById('maintenanceChart') as HTMLCanvasElement)?.getContext('2d');
    if (!ctx) {
      console.warn('Canvas maintenanceChart não encontrado');
      return;
    }

    if (this.maintenanceChart) {
      this.maintenanceChart.destroy();
    }

    this.maintenanceChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Custos com Manutenção',
          data: values,
          backgroundColor: 'rgba(0, 71, 179, 0.5)',
          borderColor: 'rgba(0, 71, 179, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  /**
   * Atualiza o gráfico de custos de abastecimento.
   */
  private updateFuelChart(months: string[], values: number[]): void {
    const ctx = (document.getElementById('fuelChart') as HTMLCanvasElement)?.getContext('2d');
    if (!ctx) {
      console.warn('Canvas fuelChart não encontrado');
      return;
    }

    if (this.fuelChart) {
      this.fuelChart.destroy();
    }

    this.fuelChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Custos com Abastecimentos',
          data: values,
          borderColor: 'rgba(179, 0, 0, 1)',
          backgroundColor: 'rgba(179, 0, 0, 0.2)',
          borderWidth: 2,
          fill: true,
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}

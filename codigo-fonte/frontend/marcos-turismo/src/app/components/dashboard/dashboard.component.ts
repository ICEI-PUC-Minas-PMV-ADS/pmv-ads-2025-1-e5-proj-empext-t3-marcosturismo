import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSidebarActive: boolean = true;
  activeVehicles: number = 0;
  pendingMaintenances: any[] = [];
  maintenanceCosts: any = {};
  fuelCosts: any = {};

  private maintenanceChart: any;
  private fuelChart: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMaintenanceCosts();
    this.loadVehicleStats();
    this.loadActiveVehicles();
    this.loadPendingMaintenances();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token não encontrado!');
    }
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  loadMaintenanceCosts(): void {
    const headers = this.getAuthHeaders();

    this.http.get(`${environment.apiUrl}/dashboard/gastos-manutencao`, { headers }).subscribe(
      (response: any) => {
        this.maintenanceCosts = response;
        const months: string[] = Object.keys(response);
        const values: number[] = Object.values(response).map(Number);
        this.updateMaintenanceChart(months, values);
      },
      (error) => console.error('Erro ao carregar gastos de manutenção:', error)
    );
  }

  loadVehicleStats(): void {
    const headers = this.getAuthHeaders();

    this.http.get(`${environment.apiUrl}/dashboard/gastos-manutencao/{tipoId}`, { headers }).subscribe(
      (response: any) => {
        this.fuelCosts = response;
        const months: string[] = Object.keys(response);
        const values: number[] = Object.values(response).map(Number);
        this.updateFuelChart(months, values);
      },
      (error) => console.error('Erro ao carregar gastos por tipo de serviço:', error)
    );
  }

  loadActiveVehicles(): void {
    const headers = this.getAuthHeaders();

    this.http.get<number>(`${environment.apiUrl}/dashboard/veiculos-ativos`, { headers }).subscribe(
      (response: number) => {
        this.activeVehicles = response;
      },
      (error) => console.error('Erro ao carregar veículos ativos:', error)
    );
  }

  loadPendingMaintenances(): void {
    const headers = this.getAuthHeaders();

    this.http.get<any[]>(`${environment.apiUrl}/dashboard/manutencoes-pendentes`, { headers }).subscribe(
      (response: any[]) => {
        this.pendingMaintenances = response;
      },
      (error) => console.error('Erro ao carregar manutenções pendentes:', error)
    );
  }

  updateMaintenanceChart(months: string[], values: number[]): void {
    const ctx = (document.getElementById('maintenanceChart') as HTMLCanvasElement)?.getContext('2d');
    if (ctx) {
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
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  updateFuelChart(months: string[], values: number[]): void {
    const ctx = (document.getElementById('fuelChart') as HTMLCanvasElement)?.getContext('2d');
    if (ctx) {
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
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
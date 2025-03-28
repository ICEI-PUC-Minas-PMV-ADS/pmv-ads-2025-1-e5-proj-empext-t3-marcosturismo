import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { SidebarComponent } from "../sidebar/sidebar.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']  // Corrigido de styleUrl para styleUrls
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Verifica se estamos no ambiente do navegador
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const ctxMaintenance = (document.getElementById('maintenanceChart') as HTMLCanvasElement)?.getContext('2d');
      const ctxFuel = (document.getElementById('fuelChart') as HTMLCanvasElement)?.getContext('2d');

      // Verificar se o contexto não é nulo
      if (ctxMaintenance) {
        new Chart(ctxMaintenance, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Custos com Manutenção',
              data: [500, 700, 350, 600, 900, 300],
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

      if (ctxFuel) {
        new Chart(ctxFuel, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Custos com Abastecimentos',
              data: [300, 400, 320, 500, 460, 600],
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
}

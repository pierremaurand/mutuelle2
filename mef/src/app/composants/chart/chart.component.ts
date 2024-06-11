import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart() {
    const chart = new Chart('pieChart', {
      type: 'doughnut',
      data: {
        labels: ['réalisé', 'non réalisé'],
        datasets: [
          {
            label: 'Réalisation',
            data: [100, 10],
            backgroundColor: ['rgba(0,255,0,0.2)', 'rgba(0,0,0,0.2)'],
            borderColor: ['rgba(255,99,132,0.2)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}

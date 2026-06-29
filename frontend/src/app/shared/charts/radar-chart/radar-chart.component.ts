import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import ApexCharts, { ApexOptions } from 'apexcharts';

import { ReportMetric } from '../../../reports/models/report.model';

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  templateUrl: './radar-chart.component.html'
})
export class RadarChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) title = '';
  @Input({ required: true }) description = '';
  @Input({ required: true }) metrics: ReportMetric[] = [];
  @Input({ required: true }) color = '#49675F';

  @ViewChild('chartHost') private chartHost?: ElementRef<HTMLDivElement>;

  private chart?: ApexCharts;
  private hasView = false;

  ngAfterViewInit(): void {
    this.hasView = true;
    this.renderChart();
  }

  ngOnChanges(): void {
    if (this.hasView) {
      this.renderChart();
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private renderChart(): void {
    const host = this.chartHost?.nativeElement;

    if (!host) {
      return;
    }

    this.chart?.destroy();

    const options: ApexOptions = {
      chart: {
        type: 'radar',
        height: 360,
        toolbar: { show: false },
        sparkline: { enabled: false },
        animations: { enabled: true, speed: 550 }
      },
      colors: [this.color],
      series: [
        {
          name: '표시 점수',
          data: this.metrics.map((metric) => metric.score)
        }
      ],
      labels: this.metrics.map((metric) => metric.label),
      fill: {
        opacity: 0.18
      },
      markers: {
        size: 4,
        strokeWidth: 2,
        strokeColors: '#ffffff',
        hover: { size: 6 }
      },
      stroke: {
        width: 3
      },
      tooltip: {
        y: {
          formatter: (value: number) => `${value} / 100`
        }
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: '#D6DAD2',
            connectorColors: '#D6DAD2',
            fill: {
              colors: ['#FFFFFF', '#F7F8F5']
            }
          }
        }
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 4,
        labels: {
          formatter: (value: number) => `${Math.round(value)}`
        }
      },
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          borderRadius: 4,
          foreColor: '#111827',
          padding: 4,
          opacity: 0.88,
          borderWidth: 0
        },
        style: {
          fontSize: '12px',
          fontWeight: '700',
          colors: ['#111827']
        }
      },
      legend: {
        show: false
      },
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: { height: 320 },
            dataLabels: { enabled: false }
          }
        }
      ]
    };

    this.chart = new ApexCharts(host, options);
    void this.chart.render();
  }
}

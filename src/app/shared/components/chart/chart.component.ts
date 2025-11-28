import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full">
      <div *ngIf="type === 'bar'" class="space-y-3">
        <div *ngFor="let item of data" class="relative">
          <div class="flex justify-between mb-1 text-sm">
            <span class="font-medium text-gray-700">{{ item.label }}</span>
            <span class="font-semibold text-gray-900">{{ formatValue(item.value) }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              class="h-3 rounded-full transition-all duration-500 ease-out"
              [style.width.%]="getPercentage(item.value)"
              [style.background-color]="item.color || '#D72638'"
            ></div>
          </div>
        </div>
      </div>

      <div *ngIf="type === 'donut'" class="flex flex-col items-center">
        <svg [attr.width]="size" [attr.height]="size" class="transform -rotate-90">
          <circle
            *ngFor="let segment of segments; let i = index"
            [attr.cx]="size / 2"
            [attr.cy]="size / 2"
            [attr.r]="radius"
            fill="transparent"
            [attr.stroke]="segment.color"
            [attr.stroke-width]="strokeWidth"
            [attr.stroke-dasharray]="segment.dashArray"
            [attr.stroke-dashoffset]="segment.dashOffset"
            class="transition-all duration-500"
          />
        </svg>
        <div class="mt-4 grid grid-cols-2 gap-3 w-full">
          <div *ngFor="let item of data" class="flex items-center gap-2">
            <div
              class="w-3 h-3 rounded-full"
              [style.background-color]="item.color || '#D72638'"
            ></div>
            <span class="text-xs text-gray-600">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() data: ChartData[] = [];
  @Input() type: 'bar' | 'donut' = 'bar';
  @Input() size = 160;
  @Input() strokeWidth = 30;

  radius = 0;
  segments: any[] = [];

  ngOnInit() {
    this.calculateChart();
  }

  ngOnChanges() {
    this.calculateChart();
  }

  calculateChart() {
    if (this.type === 'donut') {
      this.radius = (this.size - this.strokeWidth) / 2;
      const circumference = 2 * Math.PI * this.radius;
      const total = this.data.reduce((sum, item) => sum + item.value, 0);

      let currentOffset = 0;
      this.segments = this.data.map((item, index) => {
        const percentage = (item.value / total) * 100;
        const dashArray = `${(percentage / 100) * circumference} ${circumference}`;
        const dashOffset = -currentOffset;
        currentOffset += (percentage / 100) * circumference;

        return {
          color: item.color || this.getDefaultColor(index),
          dashArray,
          dashOffset
        };
      });
    }
  }

  getPercentage(value: number): number {
    const max = Math.max(...this.data.map(d => d.value));
    return (value / max) * 100;
  }

  formatValue(value: number): string {
    return value >= 1000 ? `₦${(value / 1000).toFixed(1)}k` : `₦${value}`;
  }

  getDefaultColor(index: number): string {
    const colors = ['#D72638', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
    return colors[index % colors.length];
  }
}

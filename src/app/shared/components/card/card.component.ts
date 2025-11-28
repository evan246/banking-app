import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getCardClasses()">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
  @Input() elevated = false;
  @Input() hoverable = false;
  @Input() glass = false;

  getCardClasses(): string {
    const baseClasses = 'rounded-xl p-6';
    const bgClass = this.glass ? 'glass-effect' : 'bg-white';
    const shadowClass = this.elevated ? 'shadow-lg' : 'shadow-md';
    const hoverClass = this.hoverable ? 'hover:shadow-xl transition-shadow duration-200 cursor-pointer' : '';

    return `${baseClasses} ${bgClass} ${shadowClass} ${hoverClass}`;
  }
}

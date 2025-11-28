import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="getBadgeClasses()">
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {
  @Input() variant: 'success' | 'warning' | 'error' | 'info' | 'primary' = 'primary';
  @Input() size: 'sm' | 'md' = 'md';

  getBadgeClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full';

    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm'
    };

    const variantClasses = {
      primary: 'bg-primary text-white',
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-dark',
      error: 'bg-red-600 text-white',
      info: 'bg-blue-500 text-white'
    };

    return `${baseClasses} ${sizeClasses[this.size]} ${variantClasses[this.variant]}`;
  }
}

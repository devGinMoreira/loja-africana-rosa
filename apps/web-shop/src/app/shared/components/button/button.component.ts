import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() click = new EventEmitter<MouseEvent>();

  getButtonClasses(): string {
    const baseClasses = 'font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'bg-primary hover:bg-primary-dark text-white focus:ring-primary',
      secondary: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200 focus:ring-primary',
      accent: 'bg-accent hover:bg-orange-600 text-white focus:ring-accent'
    };

    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    const disabledClass = this.disabled ? 'opacity-50 cursor-not-allowed' : '';
    const fullWidthClass = this.fullWidth ? 'w-full' : '';

    return `${baseClasses} ${variantClasses[this.variant]} ${sizeClasses[this.size]} ${disabledClass} ${fullWidthClass}`;
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.click.emit(event);
    }
  }
}

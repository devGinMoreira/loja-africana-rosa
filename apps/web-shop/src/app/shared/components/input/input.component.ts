import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() error = false;
  @Input() errorMessage = '';
  @Input() label = '';
  @Output() change = new EventEmitter<string>();

  value = '';
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  getInputClasses(): string {
    const baseClasses = 'w-full px-3 py-2.5 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent';
    const errorClass = this.error ? 'border-error bg-red-50' : 'border-neutral-200 bg-neutral-50 focus:bg-white';
    const disabledClass = this.disabled ? 'opacity-50 cursor-not-allowed bg-neutral-100' : '';
    
    return `${baseClasses} ${errorClass} ${disabledClass}`;
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.change.emit(this.value);
  }

  onInputBlur(): void {
    this.onTouched();
  }
}

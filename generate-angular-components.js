#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('\n🎨 Generating Angular Components\n');

const designSystemPath = path.join(__dirname, 'docs/design/figma-design-system.json');
const designSystem = JSON.parse(fs.readFileSync(designSystemPath, 'utf8'));

const componentsDir = path.join(__dirname, 'apps/web-shop/src/app/shared/components');

if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

console.log('✓ Creating Button Component...');

const buttonTsContent = `import { Component, Input, Output, EventEmitter } from '@angular/core';

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
    
    const variantClasses = {
      primary: 'bg-primary hover:bg-primary-dark text-white focus:ring-primary',
      secondary: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200 focus:ring-primary',
      accent: 'bg-accent hover:bg-orange-600 text-white focus:ring-accent'
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    const disabledClass = this.disabled ? 'opacity-50 cursor-not-allowed' : '';
    const fullWidthClass = this.fullWidth ? 'w-full' : '';

    return \\`\\${baseClasses} \\${variantClasses[this.variant]} \\${sizeClasses[this.size]} \\${disabledClass} \\${fullWidthClass}\\`;
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.click.emit(event);
    }
  }
}`;

const buttonHtmlContent = `<button
  [type]="type"
  [disabled]="disabled"
  [class]="getButtonClasses()"
  (click)="onClick($event)"
>
  <ng-content></ng-content>
</button>`;

const buttonCssContent = `/* Button Component Styles */
button {
  font-family: inherit;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}`;

const buttonDir = path.join(componentsDir, 'button');
if (!fs.existsSync(buttonDir)) {
  fs.mkdirSync(buttonDir, { recursive: true });
}
fs.writeFileSync(path.join(buttonDir, 'button.component.ts'), buttonTsContent);
fs.writeFileSync(path.join(buttonDir, 'button.component.html'), buttonHtmlContent);
fs.writeFileSync(path.join(buttonDir, 'button.component.css'), buttonCssContent);

console.log('✓ Creating Input Component...');

const inputTsContent = `import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
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
    
    return \\`\\${baseClasses} \\${errorClass} \\${disabledClass}\\`;
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
}`;

const inputHtmlContent = `<div class="w-full">
  <label *ngIf="label" class="block text-sm font-medium text-neutral-900 mb-2">
    {{ label }}
  </label>
  <input
    [type]="type"
    [value]="value"
    [placeholder]="placeholder"
    [disabled]="disabled"
    [class]="getButtonClasses()"
    (change)="onInputChange($event)"
    (blur)="onInputBlur()"
  />
  <p *ngIf="error && errorMessage" class="text-sm text-error mt-2">
    {{ errorMessage }}
  </p>
</div>`;

const inputCssContent = `/* Input Component Styles */
input {
  font-family: inherit;
  font-size: inherit;
}

input::placeholder {
  color: #9CA3AF;
}

input:disabled {
  cursor: not-allowed;
}`;

const inputDir = path.join(componentsDir, 'input');
if (!fs.existsSync(inputDir)) {
  fs.mkdirSync(inputDir, { recursive: true });
}
fs.writeFileSync(path.join(inputDir, 'input.component.ts'), inputTsContent);
fs.writeFileSync(path.join(inputDir, 'input.component.html'), inputHtmlContent);
fs.writeFileSync(path.join(inputDir, 'input.component.css'), inputCssContent);

console.log('✓ Creating Shared Module...');

const sharedModuleContent = `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';

const COMPONENTS = [
  ButtonComponent,
  InputComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...COMPONENTS
  ]
})
export class SharedModule { }`;

const sharedModulePath = path.join(componentsDir, '..', 'shared.module.ts');
if (!fs.existsSync(path.dirname(sharedModulePath))) {
  fs.mkdirSync(path.dirname(sharedModulePath), { recursive: true });
}
fs.writeFileSync(sharedModulePath, sharedModuleContent);

console.log('\n' + '='.repeat(60));
console.log('✓ Angular Components Generated Successfully!\n');
console.log('Generated components:');
console.log('  • ButtonComponent');
console.log('  • InputComponent');
console.log('  • SharedModule\n');
console.log('Location:');
console.log('  • ' + componentsDir + '\n');

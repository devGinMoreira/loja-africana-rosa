import { NgModule } from '@angular/core';
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
export class SharedModule { }

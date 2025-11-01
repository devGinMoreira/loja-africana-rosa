import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';

import * as AuthActions from '../../../store/auth/auth.actions';
import * as fromAuth from '../../../store/auth/auth.selectors';

// Custom validator for password match
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-md">
        <!-- Logo/Brand Section -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            {{ 'common.appName' | translate }}
          </h1>
          <p class="text-gray-600">{{ 'auth.registerTitle' | translate }}</p>
        </div>

        <!-- Register Form Card -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <!-- First Name -->
            <div class="mb-4">
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                {{ 'auth.firstName' | translate }}
              </label>
              <input
                id="firstName"
                type="text"
                formControlName="firstName"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                [placeholder]="'auth.firstName' | translate"
                [attr.aria-label]="'auth.firstName' | translate"
              />
              <div
                *ngIf="registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched"
                class="mt-2 text-sm text-red-600"
              >
                <p *ngIf="registerForm.get('firstName')?.errors?.['required']">
                  {{ 'validation.required' | translate }}
                </p>
              </div>
            </div>

            <!-- Last Name -->
            <div class="mb-4">
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                {{ 'auth.lastName' | translate }}
              </label>
              <input
                id="lastName"
                type="text"
                formControlName="lastName"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                [placeholder]="'auth.lastName' | translate"
                [attr.aria-label]="'auth.lastName' | translate"
              />
              <div
                *ngIf="registerForm.get('lastName')?.invalid && registerForm.get('lastName')?.touched"
                class="mt-2 text-sm text-red-600"
              >
                <p *ngIf="registerForm.get('lastName')?.errors?.['required']">
                  {{ 'validation.required' | translate }}
                </p>
              </div>
            </div>

            <!-- Email -->
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                {{ 'auth.email' | translate }}
              </label>
              <input
                id="email"
                type="email"
                formControlName="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                [placeholder]="'auth.email' | translate"
                [attr.aria-label]="'auth.email' | translate"
              />
              <div
                *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched"
                class="mt-2 text-sm text-red-600"
              >
                <p *ngIf="registerForm.get('email')?.errors?.['required']">
                  {{ 'auth.emailRequired' | translate }}
                </p>
                <p *ngIf="registerForm.get('email')?.errors?.['email']">
                  {{ 'auth.emailInvalid' | translate }}
                </p>
              </div>
            </div>

            <!-- Phone -->
            <div class="mb-4">
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                {{ 'auth.phone' | translate }}
              </label>
              <input
                id="phone"
                type="tel"
                formControlName="phone"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                [placeholder]="'auth.phone' | translate"
                [attr.aria-label]="'auth.phone' | translate"
              />
            </div>

            <!-- Password -->
            <div class="mb-4">
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                {{ 'auth.password' | translate }}
              </label>
              <input
                id="password"
                type="password"
                formControlName="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                [placeholder]="'auth.password' | translate"
                [attr.aria-label]="'auth.password' | translate"
              />
              <div class="mt-2 text-xs text-gray-500">
                <p>{{ 'auth.passwordMinLength' | translate }}</p>
              </div>
              <div
                *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched"
                class="mt-2 text-sm text-red-600"
              >
                <p *ngIf="registerForm.get('password')?.errors?.['required']">
                  {{ 'auth.passwordRequired' | translate }}
                </p>
                <p *ngIf="registerForm.get('password')?.errors?.['minlength']">
                  {{ 'auth.passwordMinLength' | translate }}
                </p>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="mb-6">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                {{ 'auth.confirmPassword' | translate }}
              </label>
              <input
                id="confirmPassword"
                type="password"
                formControlName="confirmPassword"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                [placeholder]="'auth.confirmPassword' | translate"
                [attr.aria-label]="'auth.confirmPassword' | translate"
              />
              <div
                *ngIf="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched"
                class="mt-2 text-sm text-red-600"
              >
                <p *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">
                  {{ 'auth.passwordRequired' | translate }}
                </p>
              </div>
            </div>

            <!-- Password Mismatch Error -->
            <div
              *ngIf="registerForm.errors?.['passwordMismatch'] && registerForm.get('confirmPassword')?.touched"
              class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <p class="text-sm text-red-600">{{ 'auth.passwordMismatch' | translate }}</p>
            </div>

            <!-- General Error Message -->
            <div *ngIf="error$ | async as error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-sm text-red-600">{{ error }}</p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="(isLoading$ | async) || registerForm.invalid"
              class="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
            >
              <span *ngIf="!(isLoading$ | async)">{{ 'auth.register' | translate }}</span>
              <span *ngIf="isLoading$ | async" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ 'common.loading' | translate }}
              </span>
            </button>
          </form>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">{{ 'common.or' | translate }}</span>
            </div>
          </div>

          <!-- Login Link -->
          <p class="text-center text-sm text-gray-600">
            {{ 'auth.haveAccount' | translate }}
            <a routerLink="/auth/login" class="text-red-600 hover:text-red-700 font-semibold">
              {{ 'auth.loginNow' | translate }}
            </a>
          </p>
        </div>

        <!-- Additional Info -->
        <div class="mt-6 text-center text-xs text-gray-500">
          <p>{{ 'common.appName' | translate }} © 2025</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  isLoading$ = this.store.select(fromAuth.selectIsLoading);
  error$ = this.store.select(fromAuth.selectError);

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // If already logged in, redirect to home
    this.store
      .select(fromAuth.selectIsAuthenticated)
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: passwordMatchValidator }
    );
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, phone, password } = this.registerForm.value;
      this.store.dispatch(
        AuthActions.register({
          data: {
            firstName: firstName!,
            lastName: lastName!,
            email: email!,
            phone: phone || '',
            password: password!
          }
        })
      );
    }
  }
}

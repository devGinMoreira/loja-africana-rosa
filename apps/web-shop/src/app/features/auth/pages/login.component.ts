import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';

import * as AuthActions from '../../../store/auth/auth.actions';
import * as fromAuth from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-login',
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
          <p class="text-gray-600">{{ 'auth.loginTitle' | translate }}</p>
        </div>

        <!-- Login Form Card -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <!-- Email Field -->
            <div class="mb-6">
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
                *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
                class="mt-2 text-sm text-red-600"
              >
                <p *ngIf="loginForm.get('email')?.errors?.['required']">
                  {{ 'auth.emailRequired' | translate }}
                </p>
                <p *ngIf="loginForm.get('email')?.errors?.['email']">
                  {{ 'auth.emailInvalid' | translate }}
                </p>
              </div>
            </div>

            <!-- Password Field -->
            <div class="mb-6">
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
              <div
                *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                class="mt-2 text-sm text-red-600"
              >
                <p *ngIf="loginForm.get('password')?.errors?.['required']">
                  {{ 'auth.passwordRequired' | translate }}
                </p>
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between mb-6">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  formControlName="rememberMe"
                  class="rounded border-gray-300 text-red-600 shadow-sm focus:ring-red-500"
                />
                <span class="ml-2 text-sm text-gray-600">
                  {{ 'auth.rememberMe' | translate }}
                </span>
              </label>
              <a href="#" class="text-sm text-red-600 hover:text-red-700">
                {{ 'auth.forgotPassword' | translate }}
              </a>
            </div>

            <!-- Error Message -->
            <div *ngIf="error$ | async as error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-sm text-red-600">{{ error }}</p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="(isLoading$ | async) || loginForm.invalid"
              class="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
            >
              <span *ngIf="!(isLoading$ | async)">{{ 'auth.login' | translate }}</span>
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

          <!-- Register Link -->
          <p class="text-center text-sm text-gray-600">
            {{ 'auth.noAccount' | translate }}
            <a routerLink="/auth/register" class="text-red-600 hover:text-red-700 font-semibold">
              {{ 'auth.registerNow' | translate }}
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
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
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
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(
        AuthActions.login({
          credentials: {
            email: email!,
            password: password!
          }
        })
      );
    }
  }
}

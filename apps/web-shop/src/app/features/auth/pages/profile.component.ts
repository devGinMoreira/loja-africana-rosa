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
  const password = control.get('newPassword');
  const confirmPassword = control.get('confirmNewPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8 px-4">
      <div class="max-w-2xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <a routerLink="/" class="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center">
            <span class="mr-2">←</span>
            {{ 'common.back' | translate }}
          </a>
          <h1 class="text-3xl font-bold text-gray-900 mt-4">{{ 'account.title' | translate }}</h1>
        </div>

        <!-- Tabs Navigation -->
        <div class="bg-white rounded-lg shadow mb-6 border-b border-gray-200">
          <div class="flex">
            <button
              (click)="activeTab = 'profile'"
              [class.border-b-2]="activeTab === 'profile'"
              [class.border-red-600]="activeTab === 'profile'"
              class="px-6 py-4 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none transition"
            >
              {{ 'account.profile' | translate }}
            </button>
            <button
              (click)="activeTab = 'password'"
              [class.border-b-2]="activeTab === 'password'"
              [class.border-red-600]="activeTab === 'password'"
              class="px-6 py-4 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none transition"
            >
              {{ 'account.security' | translate }}
            </button>
            <button
              (click)="activeTab = 'addresses'"
              [class.border-b-2]="activeTab === 'addresses'"
              [class.border-red-600]="activeTab === 'addresses'"
              class="px-6 py-4 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none transition"
            >
              {{ 'account.addresses' | translate }}
            </button>
          </div>
        </div>

        <!-- Profile Tab -->
        <div *ngIf="activeTab === 'profile'" class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">{{ 'account.personalInfo' | translate }}</h2>

          <form [formGroup]="profileForm" (ngSubmit)="onSubmitProfile()">
            <!-- First Name -->
            <div class="mb-6">
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                {{ 'account.firstName' | translate }}
              </label>
              <input
                id="firstName"
                type="text"
                formControlName="firstName"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                [placeholder]="'account.firstName' | translate"
              />
            </div>

            <!-- Last Name -->
            <div class="mb-6">
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                {{ 'account.lastName' | translate }}
              </label>
              <input
                id="lastName"
                type="text"
                formControlName="lastName"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                [placeholder]="'account.lastName' | translate"
              />
            </div>

            <!-- Email (Read-only) -->
            <div class="mb-6">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                {{ 'account.email' | translate }}
              </label>
              <input
                id="email"
                type="email"
                disabled
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                [value]="(currentUser$ | async)?.email"
              />
              <p class="mt-2 text-xs text-gray-500">{{ 'common.readonly' | translate }}</p>
            </div>

            <!-- Phone -->
            <div class="mb-6">
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                {{ 'account.phone' | translate }}
              </label>
              <input
                id="phone"
                type="tel"
                formControlName="phone"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                [placeholder]="'account.phone' | translate"
              />
            </div>

            <!-- Success/Error Messages -->
            <div *ngIf="profileSuccess$ | async as success" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p class="text-sm text-green-600">{{ success }}</p>
            </div>

            <div *ngIf="profileError$ | async as error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-sm text-red-600">{{ error }}</p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="(isLoading$ | async) || profileForm.invalid"
              class="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              <span *ngIf="!(isLoading$ | async)">{{ 'account.updateProfile' | translate }}</span>
              <span *ngIf="isLoading$ | async">{{ 'common.loading' | translate }}</span>
            </button>
          </form>
        </div>

        <!-- Password Tab -->
        <div *ngIf="activeTab === 'password'" class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">{{ 'account.changePassword' | translate }}</h2>

          <form [formGroup]="passwordForm" (ngSubmit)="onSubmitPassword()">
            <!-- Current Password -->
            <div class="mb-6">
              <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-2">
                {{ 'account.currentPassword' | translate }}
              </label>
              <input
                id="currentPassword"
                type="password"
                formControlName="currentPassword"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                [placeholder]="'account.currentPassword' | translate"
              />
              <div
                *ngIf="passwordForm.get('currentPassword')?.invalid && passwordForm.get('currentPassword')?.touched"
                class="mt-2 text-sm text-red-600"
              >
                <p *ngIf="passwordForm.get('currentPassword')?.errors?.['required']">
                  {{ 'validation.required' | translate }}
                </p>
              </div>
            </div>

            <!-- New Password -->
            <div class="mb-6">
              <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">
                {{ 'account.newPassword' | translate }}
              </label>
              <input
                id="newPassword"
                type="password"
                formControlName="newPassword"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                [placeholder]="'account.newPassword' | translate"
              />
              <div
                *ngIf="passwordForm.get('newPassword')?.invalid && passwordForm.get('newPassword')?.touched"
                class="mt-2 text-sm text-red-600"
              >
                <p *ngIf="passwordForm.get('newPassword')?.errors?.['required']">
                  {{ 'validation.required' | translate }}
                </p>
                <p *ngIf="passwordForm.get('newPassword')?.errors?.['minlength']">
                  {{ 'auth.passwordMinLength' | translate }}
                </p>
              </div>
            </div>

            <!-- Confirm New Password -->
            <div class="mb-6">
              <label for="confirmNewPassword" class="block text-sm font-medium text-gray-700 mb-2">
                {{ 'account.confirmNewPassword' | translate }}
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                formControlName="confirmNewPassword"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                [placeholder]="'account.confirmNewPassword' | translate"
              />
              <div
                *ngIf="passwordForm.get('confirmNewPassword')?.invalid && passwordForm.get('confirmNewPassword')?.touched"
                class="mt-2 text-sm text-red-600"
              >
                <p *ngIf="passwordForm.get('confirmNewPassword')?.errors?.['required']">
                  {{ 'validation.required' | translate }}
                </p>
              </div>
            </div>

            <!-- Password Mismatch Error -->
            <div
              *ngIf="passwordForm.errors?.['passwordMismatch'] && passwordForm.get('confirmNewPassword')?.touched"
              class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <p class="text-sm text-red-600">{{ 'auth.passwordMismatch' | translate }}</p>
            </div>

            <!-- Success/Error Messages -->
            <div *ngIf="passwordSuccess$ | async as success" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p class="text-sm text-green-600">{{ success }}</p>
            </div>

            <div *ngIf="passwordError$ | async as error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-sm text-red-600">{{ error }}</p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="(isLoading$ | async) || passwordForm.invalid"
              class="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              <span *ngIf="!(isLoading$ | async)">{{ 'account.changePassword' | translate }}</span>
              <span *ngIf="isLoading$ | async">{{ 'common.loading' | translate }}</span>
            </button>
          </form>
        </div>

        <!-- Addresses Tab -->
        <div *ngIf="activeTab === 'addresses'" class="bg-white rounded-lg shadow-lg p-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">{{ 'account.saveAddresses' | translate }}</h2>
            <button
              (click)="showAddressForm = !showAddressForm"
              class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              {{ showAddressForm ? ('common.cancel' | translate) : ('account.addAddress' | translate) }}
            </button>
          </div>

          <!-- Add/Edit Address Form -->
          <div *ngIf="showAddressForm" class="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              {{ editingAddressId ? ('account.editAddress' | translate) : ('account.addAddress' | translate) }}
            </h3>

            <form [formGroup]="addressForm" (ngSubmit)="onSubmitAddress()">
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label for="street" class="block text-sm font-medium text-gray-700 mb-2">
                    {{ 'checkout.street' | translate }}
                  </label>
                  <input
                    id="street"
                    type="text"
                    formControlName="street"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700 mb-2">
                    {{ 'checkout.city' | translate }}
                  </label>
                  <input
                    id="city"
                    type="text"
                    formControlName="city"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label for="postalCode" class="block text-sm font-medium text-gray-700 mb-2">
                    {{ 'checkout.postalCode' | translate }}
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    formControlName="postalCode"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label for="country" class="block text-sm font-medium text-gray-700 mb-2">
                    {{ 'checkout.country' | translate }}
                  </label>
                  <input
                    id="country"
                    type="text"
                    formControlName="country"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <label class="flex items-center mb-6">
                <input
                  type="checkbox"
                  formControlName="isDefault"
                  class="rounded border-gray-300 text-red-600"
                />
                <span class="ml-2 text-sm text-gray-600">
                  {{ 'checkout.setDefault' | translate }}
                </span>
              </label>

              <div class="flex gap-3">
                <button
                  type="submit"
                  [disabled]="isLoading$ | async"
                  class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg"
                >
                  {{ 'common.save' | translate }}
                </button>
                <button
                  type="button"
                  (click)="showAddressForm = false"
                  class="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 px-6 rounded-lg"
                >
                  {{ 'common.cancel' | translate }}
                </button>
              </div>
            </form>
          </div>

          <!-- Addresses List -->
          <div class="space-y-4">
            <p class="text-gray-500 text-sm" *ngIf="!addresses || addresses.length === 0">
              {{ 'common.noData' | translate }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProfileComponent implements OnInit, OnDestroy {
  activeTab: 'profile' | 'password' | 'addresses' = 'profile';
  showAddressForm = false;
  editingAddressId: string | null = null;

  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  addressForm!: FormGroup;

  currentUser$ = this.store.select(fromAuth.selectCurrentUser);
  isLoading$ = this.store.select(fromAuth.selectIsLoading);
  profileError$ = this.store.select(fromAuth.selectError);
  passwordError$ = this.store.select(fromAuth.selectError);
  profileSuccess$ = this.store.select(fromAuth.selectError); // Placeholder
  passwordSuccess$ = this.store.select(fromAuth.selectError); // Placeholder

  addresses: any[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    // Load current user data
    this.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user) {
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone || ''
        });
      } else {
        // Redirect to login if no user
        this.router.navigate(['/auth/login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForms(): void {
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['']
    });

    this.passwordForm = this.formBuilder.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmNewPassword: ['', [Validators.required]]
      },
      { validators: passwordMatchValidator }
    );

    this.addressForm = this.formBuilder.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      isDefault: [false]
    });
  }

  onSubmitProfile(): void {
    if (this.profileForm.valid) {
      const { firstName, lastName, phone } = this.profileForm.value;
      this.store.dispatch(
        AuthActions.updateProfile({
          data: {
            firstName,
            lastName,
            phone: phone || ''
          }
        })
      );
    }
  }

  onSubmitPassword(): void {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword } = this.passwordForm.value;
      this.store.dispatch(
        AuthActions.changePassword({
          currentPassword,
          newPassword
        })
      );
      // Reset form after submission
      this.passwordForm.reset();
    }
  }

  onSubmitAddress(): void {
    if (this.addressForm.valid) {
      const address = this.addressForm.value;
      // TODO: Dispatch address action
      this.showAddressForm = false;
      this.addressForm.reset();
    }
  }
}

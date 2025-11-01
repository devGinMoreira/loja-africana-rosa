import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { selectCurrentUser } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, TranslateModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <section class="bg-white border-b border-gray-200 py-8 px-4">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ 'account.myAccount' | translate }}</h1>
          <p class="text-gray-600">{{ 'account.subtitle' | translate }}</p>
        </div>
      </section>

      <!-- Content -->
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div *ngIf="currentUser$ | async as user" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Sidebar -->
          <aside class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow p-6">
              <div class="text-center mb-6">
                <div class="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-3xl text-white">👤</span>
                </div>
                <h2 class="text-2xl font-bold text-gray-900">{{ user.firstName }} {{ user.lastName }}</h2>
                <p class="text-gray-600 mt-1">{{ user.email }}</p>
              </div>

              <nav class="space-y-2">
                <button (click)="selectTab('profile')"
                  class="w-full text-left px-4 py-3 rounded-lg transition"
                  [class.bg-red-100]="selectedTab === 'profile'"
                  [class.text-red-600]="selectedTab === 'profile'"
                  [class.hover:bg-gray-100]="selectedTab !== 'profile'"
                  [class.text-gray-700]="selectedTab !== 'profile'">
                  {{ 'account.profile' | translate }}
                </button>
                <button (click)="selectTab('addresses')"
                  class="w-full text-left px-4 py-3 rounded-lg transition"
                  [class.bg-red-100]="selectedTab === 'addresses'"
                  [class.text-red-600]="selectedTab === 'addresses'"
                  [class.hover:bg-gray-100]="selectedTab !== 'addresses'"
                  [class.text-gray-700]="selectedTab !== 'addresses'">
                  {{ 'account.addresses' | translate }}
                </button>
                <button (click)="selectTab('preferences')"
                  class="w-full text-left px-4 py-3 rounded-lg transition"
                  [class.bg-red-100]="selectedTab === 'preferences'"
                  [class.text-red-600]="selectedTab === 'preferences'"
                  [class.hover:bg-gray-100]="selectedTab !== 'preferences'"
                  [class.text-gray-700]="selectedTab !== 'preferences'">
                  {{ 'account.preferences' | translate }}
                </button>
                <button (click)="logout()"
                  class="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition font-semibold">
                  {{ 'account.logout' | translate }}
                </button>
              </nav>
            </div>
          </aside>

          <!-- Main Content -->
          <main class="lg:col-span-2 space-y-6">
            <!-- Profile Tab -->
            <div *ngIf="selectedTab === 'profile'" class="bg-white rounded-lg shadow p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ 'account.profileInfo' | translate }}</h2>
              <form [formGroup]="profileForm" (ngSubmit)="onUpdateProfile()" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ 'checkout.firstName' | translate }}
                    </label>
                    <input
                      type="text"
                      formControlName="firstName"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-900 mb-2">
                      {{ 'checkout.lastName' | translate }}
                    </label>
                    <input
                      type="text"
                      formControlName="lastName"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2">
                    {{ 'checkout.email' | translate }}
                  </label>
                  <input
                    type="email"
                    formControlName="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    [disabled]="true"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2">
                    {{ 'checkout.phone' | translate }}
                  </label>
                  <input
                    type="tel"
                    formControlName="phone"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <button
                  type="submit"
                  [disabled]="!profileForm.valid || isSaving"
                  class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:bg-gray-400 font-semibold">
                  <span *ngIf="!isSaving">{{ 'account.saveChanges' | translate }}</span>
                  <span *ngIf="isSaving">{{ 'common.saving' | translate }}</span>
                </button>
              </form>
            </div>

            <!-- Addresses Tab -->
            <div *ngIf="selectedTab === 'addresses'" class="bg-white rounded-lg shadow p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ 'account.savedAddresses' | translate }}</h2>
              <div *ngIf="(savedAddresses$ | async)?.length === 0" class="text-center py-8">
                <p class="text-gray-600">{{ 'account.noAddresses' | translate }}</p>
              </div>

              <div *ngIf="(savedAddresses$ | async) as addresses" class="space-y-4">
                <div *ngFor="let address of addresses" class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="font-semibold text-gray-900">{{ address.name }}</h3>
                    <div class="flex gap-2">
                      <button (click)="editAddress(address)"
                        class="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                        {{ 'common.edit' | translate }}
                      </button>
                      <button (click)="deleteAddress(address.id)"
                        class="text-red-600 hover:text-red-700 text-sm font-semibold">
                        {{ 'common.delete' | translate }}
                      </button>
                    </div>
                  </div>
                  <p class="text-gray-600 text-sm">{{ address.street }}, {{ address.number }}</p>
                  <p class="text-gray-600 text-sm">{{ address.postalCode }} {{ address.city }}</p>
                  <span *ngIf="address.isDefault" class="inline-block mt-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {{ 'checkout.default' | translate }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Preferences Tab -->
            <div *ngIf="selectedTab === 'preferences'" class="bg-white rounded-lg shadow p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ 'account.preferences' | translate }}</h2>
              <form [formGroup]="preferencesForm" (ngSubmit)="onUpdatePreferences()" class="space-y-4">
                <div class="space-y-3">
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      formControlName="emailNotifications"
                      class="w-4 h-4 text-red-600 rounded"
                    />
                    <span class="text-gray-700">{{ 'account.emailNotifications' | translate }}</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      formControlName="smsNotifications"
                      class="w-4 h-4 text-red-600 rounded"
                    />
                    <span class="text-gray-700">{{ 'account.smsNotifications' | translate }}</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      formControlName="newsletter"
                      class="w-4 h-4 text-red-600 rounded"
                    />
                    <span class="text-gray-700">{{ 'account.newsletter' | translate }}</span>
                  </label>
                </div>

                <button
                  type="submit"
                  [disabled]="!preferencesForm.valid || isSaving"
                  class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:bg-gray-400 font-semibold">
                  <span *ngIf="!isSaving">{{ 'account.saveChanges' | translate }}</span>
                  <span *ngIf="isSaving">{{ 'common.saving' | translate }}</span>
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AccountComponent implements OnInit {
  currentUser$!: Observable<any>;
  savedAddresses$!: Observable<any[]>;

  profileForm!: FormGroup;
  preferencesForm!: FormGroup;
  selectedTab: 'profile' | 'addresses' | 'preferences' = 'profile';
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private store: Store<any>
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.currentUser$.subscribe(user => {
      if (user) {
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone || ''
        });
      }
    });
  }

  private initializeForms(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });

    this.preferencesForm = this.fb.group({
      emailNotifications: [true],
      smsNotifications: [false],
      newsletter: [true]
    });
  }

  selectTab(tab: 'profile' | 'addresses' | 'preferences'): void {
    this.selectedTab = tab;
  }

  onUpdateProfile(): void {
    if (!this.profileForm.valid) return;

    this.isSaving = true;
    // Call service to update profile
    this.isSaving = false;
    this.notificationService.success('Profile updated successfully');
  }

  onUpdatePreferences(): void {
    if (!this.preferencesForm.valid) return;

    this.isSaving = true;
    // Call service to update preferences
    this.isSaving = false;
    this.notificationService.success('Preferences updated successfully');
  }

  editAddress(address: any): void {
    // Navigate to edit address
  }

  deleteAddress(addressId: string): void {
    if (confirm('Are you sure you want to delete this address?')) {
      this.notificationService.success('Address deleted successfully');
    }
  }

  logout(): void {
    this.authService.logout();
    this.notificationService.success('You have been logged out');
  }

  trackByAddressId(index: number, address: any): string {
    return address.id;
  }
}

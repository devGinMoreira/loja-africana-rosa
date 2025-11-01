import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import * as AuthActions from '../../store/auth/auth.actions';
import * as fromAuth from '../../store/auth/auth.selectors';
import * as fromCart from '../../store/cart/cart.selectors';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <header class="bg-white shadow-md sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <a routerLink="/" class="text-2xl font-bold text-red-600">
            🏪 {{ 'common.appName' | translate }}
          </a>
        </div>

        <!-- Search Bar - Hidden on mobile -->
        <div class="hidden md:flex flex-1 mx-8">
          <div class="w-full relative">
            <input
              type="text"
              placeholder="{{ 'header.searchPlaceholder' | translate }}"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button class="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
              🔍
            </button>
          </div>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Language Selector -->
          <div class="relative group">
            <button
              class="px-3 py-2 text-gray-700 hover:text-red-600 font-semibold text-sm flex items-center space-x-1"
            >
              <span>🌐</span>
              <span>{{ currentLanguage }}</span>
            </button>
            <div class="absolute right-0 mt-0 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <button
                (click)="onChangeLanguage('pt-PT')"
                class="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                🇵🇹 Português
              </button>
              <button
                (click)="onChangeLanguage('en-US')"
                class="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                🇺🇸 English
              </button>
            </div>
          </div>

          <!-- Cart Icon with Count -->
          <a
            routerLink="/cart"
            class="relative px-3 py-2 text-gray-700 hover:text-red-600 font-semibold flex items-center space-x-1"
          >
            <span class="text-xl">🛒</span>
            <span *ngIf="(cartItemCount$ | async) as count" class="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {{ count }}
            </span>
          </a>

          <!-- Account/Login -->
          <div *ngIf="isAuthenticated$ | async" class="relative group">
            <button
              class="px-3 py-2 text-gray-700 hover:text-red-600 font-semibold text-sm flex items-center space-x-1"
            >
              <span>👤</span>
              <span>{{ (currentUser$ | async)?.firstName }}</span>
            </button>
            <div class="absolute right-0 mt-0 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <a
                routerLink="/auth/profile"
                class="w-full block px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                {{ 'account.profile' | translate }}
              </a>
              <a
                routerLink="/orders"
                class="w-full block px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                {{ 'orders.title' | translate }}
              </a>
              <button
                (click)="onLogout()"
                class="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-semibold"
              >
                {{ 'auth.logout' | translate }}
              </button>
            </div>
          </div>

          <!-- Login Button -->
          <a
            *ngIf="!(isAuthenticated$ | async)"
            routerLink="/auth/login"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold text-sm"
          >
            {{ 'auth.login' | translate }}
          </a>

          <!-- Mobile Menu Button -->
          <button
            (click)="toggleMobileMenu()"
            class="md:hidden text-gray-700 hover:text-red-600 text-2xl"
          >
            ☰
          </button>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <div *ngIf="showMobileMenu" class="md:hidden bg-gray-50 border-t border-gray-200">
        <div class="px-4 py-4 space-y-2">
          <input
            type="text"
            placeholder="{{ 'header.searchPlaceholder' | translate }}"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
          />
          <a routerLink="/products" class="block px-4 py-2 text-gray-700 hover:text-red-600">
            {{ 'products.title' | translate }}
          </a>
          <a routerLink="/cart" class="block px-4 py-2 text-gray-700 hover:text-red-600">
            {{ 'cart.title' | translate }}
          </a>
          <div *ngIf="isAuthenticated$ | async">
            <a routerLink="/auth/profile" class="block px-4 py-2 text-gray-700 hover:text-red-600">
              {{ 'account.profile' | translate }}
            </a>
            <button
              (click)="onLogout()"
              class="w-full text-left px-4 py-2 text-red-600 font-semibold hover:bg-gray-100"
            >
              {{ 'auth.logout' | translate }}
            </button>
          </div>
          <a
            *ngIf="!(isAuthenticated$ | async)"
            routerLink="/auth/login"
            class="block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold text-center"
          >
            {{ 'auth.login' | translate }}
          </a>
        </div>
      </div>
    </header>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {
  isAuthenticated$ = this.store.select(fromAuth.selectIsAuthenticated);
  currentUser$ = this.store.select(fromAuth.selectCurrentUser);
  cartItemCount$ = this.store.select(fromCart.selectItemCount);

  showMobileMenu = false;
  currentLanguage = 'PT';

  constructor(
    private store: Store,
    private i18nService: I18nService,
    private translateService: TranslateService,
    private router: Router
  ) {
    this.updateLanguageDisplay();
  }

  ngOnInit(): void {
    // Watch for language changes
    this.translateService.onLangChange.subscribe(() => {
      this.updateLanguageDisplay();
    });
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  onChangeLanguage(lang: string): void {
    this.i18nService.setLanguage(lang);
    this.updateLanguageDisplay();
    this.showMobileMenu = false;
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/']);
    this.showMobileMenu = false;
  }

  private updateLanguageDisplay(): void {
    const current = this.i18nService.getCurrentLanguage();
    this.currentLanguage = current === 'pt-PT' ? 'PT' : 'EN';
  }
}

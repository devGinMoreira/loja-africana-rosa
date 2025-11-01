import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import * as ProductActions from '../../../store/products/products.actions';
import * as ProductSelectors from '../../../store/products/products.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  template: `
    <div class="min-h-screen bg-white">
      <!-- Hero Banner -->
      <section class="bg-gradient-to-r from-primary to-secondary text-white py-16 md:py-24">
        <div class="max-w-6xl mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <!-- Left: Text Content -->
            <div class="space-y-6">
              <h1 class="text-4xl md:text-5xl font-bold leading-tight">
                {{ 'home.heroTitle' | translate }}
              </h1>
              <p class="text-lg md:text-xl text-gray-100">
                {{ 'home.heroSubtitle' | translate }}
              </p>

              <!-- Free Delivery Banner -->
              <div class="bg-white bg-opacity-20 backdrop-blur rounded-lg p-4 border border-white border-opacity-30">
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                  </svg>
                  <div>
                    <p class="font-semibold">{{ 'home.freeDeliveryTitle' | translate }}</p>
                    <p class="text-sm text-gray-100">{{ 'home.freeDeliveryMessage' | translate }}</p>
                  </div>
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4">
                <button (click)="navigateTo('/products')" 
                        class="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {{ 'home.shopNow' | translate }}
                </button>
                <button (click)="scrollToCategories()" 
                        class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                  {{ 'home.exploreCatalog' | translate }}
                </button>
              </div>
            </div>

            <!-- Right: Hero Image -->
            <div class="hidden md:flex justify-center">
              <div class="bg-white bg-opacity-10 backdrop-blur rounded-lg p-8 border border-white border-opacity-20">
                <div class="text-center">
                  <svg class="w-32 h-32 mx-auto text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-0.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-0.9-2-2-2z"></path>
                  </svg>
                  <p class="text-white mt-4 text-lg font-semibold">{{ 'home.qualityProducts' | translate }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section #categoriesSection class="py-16 md:py-24 bg-gray-50">
        <div class="max-w-6xl mx-auto px-4">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            {{ 'home.categoriesTitle' | translate }}
          </h2>
          <p class="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {{ 'home.categoriesSubtitle' | translate }}
          </p>

          <!-- Categories Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Mercearia -->
            <div (click)="filterByCategory('mercearia')" 
                 class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
              <div class="bg-gradient-to-br from-yellow-400 to-orange-400 h-40 flex items-center justify-center">
                <svg class="w-20 h-20 text-white opacity-80 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path>
                </svg>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ 'products.categories.mercearia' | translate }}</h3>
                <p class="text-gray-600 text-sm mb-4">{{ 'home.merceariaDesc' | translate }}</p>
                <div class="text-primary font-semibold group-hover:translate-x-1 transition-transform">
                  {{ 'home.explore' | translate }} →
                </div>
              </div>
            </div>

            <!-- Talho -->
            <div (click)="filterByCategory('talho')" 
                 class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
              <div class="bg-gradient-to-br from-red-400 to-red-600 h-40 flex items-center justify-center">
                <svg class="w-20 h-20 text-white opacity-80 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ 'products.categories.talho' | translate }}</h3>
                <p class="text-gray-600 text-sm mb-4">{{ 'home.talhoDes' | translate }}</p>
                <div class="text-primary font-semibold group-hover:translate-x-1 transition-transform">
                  {{ 'home.explore' | translate }} →
                </div>
              </div>
            </div>

            <!-- Peixaria -->
            <div (click)="filterByCategory('peixaria')" 
                 class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
              <div class="bg-gradient-to-br from-blue-400 to-cyan-500 h-40 flex items-center justify-center">
                <svg class="w-20 h-20 text-white opacity-80 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path>
                </svg>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ 'products.categories.peixaria' | translate }}</h3>
                <p class="text-gray-600 text-sm mb-4">{{ 'home.peixariaDes' | translate }}</p>
                <div class="text-primary font-semibold group-hover:translate-x-1 transition-transform">
                  {{ 'home.explore' | translate }} →
                </div>
              </div>
            </div>

            <!-- Cosméticos -->
            <div (click)="filterByCategory('cosmeticos')" 
                 class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
              <div class="bg-gradient-to-br from-pink-400 to-rose-500 h-40 flex items-center justify-center">
                <svg class="w-20 h-20 text-white opacity-80 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ 'products.categories.cosmeticos' | translate }}</h3>
                <p class="text-gray-600 text-sm mb-4">{{ 'home.cosmeticosDes' | translate }}</p>
                <div class="text-primary font-semibold group-hover:translate-x-1 transition-transform">
                  {{ 'home.explore' | translate }} →
                </div>
              </div>
            </div>

            <!-- Cabo Verde -->
            <div (click)="filterByCategory('produtosCaboVerde')" 
                 class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
              <div class="bg-gradient-to-br from-green-400 to-emerald-600 h-40 flex items-center justify-center">
                <svg class="w-20 h-20 text-white opacity-80 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ 'products.categories.produtosCaboVerde' | translate }}</h3>
                <p class="text-gray-600 text-sm mb-4">{{ 'home.caboverdeDes' | translate }}</p>
                <div class="text-primary font-semibold group-hover:translate-x-1 transition-transform">
                  {{ 'home.explore' | translate }} →
                </div>
              </div>
            </div>

            <!-- Outros -->
            <div (click)="filterByCategory('outros')" 
                 class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
              <div class="bg-gradient-to-br from-purple-400 to-purple-600 h-40 flex items-center justify-center">
                <svg class="w-20 h-20 text-white opacity-80 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ 'products.categories.outros' | translate }}</h3>
                <p class="text-gray-600 text-sm mb-4">{{ 'home.outrosDes' | translate }}</p>
                <div class="text-primary font-semibold group-hover:translate-x-1 transition-transform">
                  {{ 'home.explore' | translate }} →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Products Section -->
      <section class="py-16 md:py-24">
        <div class="max-w-6xl mx-auto px-4">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            {{ 'home.featuredProductsTitle' | translate }}
          </h2>
          <p class="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {{ 'home.featuredProductsSubtitle' | translate }}
          </p>

          <!-- Products Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div *ngFor="let product of (featuredProducts$ | async)" 
                 (click)="navigateToProduct(product.id)"
                 class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
              <!-- Product Image -->
              <div class="bg-gray-200 h-48 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <div class="text-gray-400 text-4xl">📦</div>
              </div>

              <!-- Product Info -->
              <div class="p-4 space-y-3">
                <!-- Category -->
                <div class="text-xs font-semibold text-primary uppercase">
                  {{ product.category }}
                </div>

                <!-- Product Name -->
                <h3 class="text-lg font-bold text-gray-900 line-clamp-2">
                  {{ product.name }}
                </h3>

                <!-- Rating -->
                <div class="flex items-center gap-2">
                  <div class="flex text-yellow-400">
                    <span *ngFor="let i of [1,2,3,4,5]" class="text-sm">★</span>
                  </div>
                  <span class="text-sm text-gray-500">({{ product.rating }})</span>
                </div>

                <!-- Price -->
                <div class="flex items-baseline gap-2">
                  <span class="text-2xl font-bold text-primary">
                    {{ product.price | currency: 'EUR':'symbol':'1.2-2' }}
                  </span>
                  <span *ngIf="product.isPromotion" class="text-sm line-through text-gray-500">
                    {{ (product.price * 1.2) | currency: 'EUR':'symbol':'1.2-2' }}
                  </span>
                </div>

                <!-- Badges -->
                <div class="flex gap-2">
                  <span *ngIf="product.isPromotion" class="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                    {{ 'products.promotion' | translate }}
                  </span>
                  <span *ngIf="(product?.rating || 0) >= 4.8" class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                    {{ 'products.topSeller' | translate }}
                  </span>
                </div>

                <!-- Add to Cart Button -->
                <button class="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors mt-4">
                  {{ 'products.addToCart' | translate }}
                </button>
              </div>
            </div>
          </div>

          <!-- View All Button -->
          <div class="text-center mt-12">
            <button (click)="navigateTo('/products')" 
                    class="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
              {{ 'home.viewAllProducts' | translate }}
            </button>
          </div>
        </div>
      </section>

      <!-- Why Choose Us Section -->
      <section class="bg-gray-50 py-16 md:py-24">
        <div class="max-w-6xl mx-auto px-4">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            {{ 'home.whyChooseUsTitle' | translate }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Quality -->
            <div class="text-center">
              <div class="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ 'home.qualityProducts' | translate }}</h3>
              <p class="text-gray-600">{{ 'home.qualityDesc' | translate }}</p>
            </div>

            <!-- Fast Delivery -->
            <div class="text-center">
              <div class="bg-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM5 11h14V6.98L18.5 12h-13L5 6.98V11z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ 'home.fastDeliveryTitle' | translate }}</h3>
              <p class="text-gray-600">{{ 'home.fastDeliveryDesc' | translate }}</p>
            </div>

            <!-- Customer Support -->
            <div class="text-center">
              <div class="bg-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.65 3 4.19c0 9.89 8.02 17.9 17.81 17.9.54 0 1.19-.65 1.19-1.19v-3.76c0-.54-.45-.99-.99-.99z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ 'home.supportTitle' | translate }}</h3>
              <p class="text-gray-600">{{ 'home.supportDesc' | translate }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Newsletter Section -->
      <section class="bg-gradient-to-r from-primary to-secondary text-white py-16 md:py-20">
        <div class="max-w-2xl mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ 'home.newsletterTitle' | translate }}</h2>
          <p class="text-lg text-gray-100 mb-8">{{ 'home.newsletterSubtitle' | translate }}</p>

          <form (ngSubmit)="subscribeNewsletter()" class="flex gap-2 max-w-md mx-auto">
            <input type="email" 
                   [(ngModel)]="newsletterEmail"
                   name="email"
                   placeholder="{{ 'home.emailPlaceholder' | translate }}"
                   class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white">
            <button type="submit" 
                    class="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {{ 'home.subscribe' | translate }}
            </button>
          </form>

          <p class="text-sm text-gray-200 mt-4">{{ 'home.privacyMessage' | translate }}</p>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  featuredProducts$ = this.store.select(ProductSelectors.selectTopBestSellers);
  newsletterEmail: string = '';

  constructor(
    private store: Store<any>,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load top best sellers
    this.store.dispatch(
      ProductActions.loadProducts({
        filters: {
          categories: [],
          minPrice: 0,
          maxPrice: 500,
          inStockOnly: true,
          ratings: [],
          onPromotion: false,
          searchQuery: ''
        },
        sortBy: 'popularity',
        page: 1,
        limit: 50
      })
    );
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  navigateToProduct(productId: string): void {
    this.router.navigate(['/products', productId]);
  }

  filterByCategory(category: string): void {
    this.router.navigate(['/products'], {
      queryParams: { category }
    });
  }

  scrollToCategories(): void {
    const element = document.querySelector('[#categoriesSection]');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  subscribeNewsletter(): void {
    if (this.newsletterEmail) {
      // TODO: Implement newsletter subscription API call
      console.log('Subscribe:', this.newsletterEmail);
      this.newsletterEmail = '';
      // Show success message
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

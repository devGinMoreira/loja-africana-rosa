import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ProductService, Product } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ProductCardComponent],
  template: `
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-red-600 to-red-800 text-white py-20 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-4">
          {{ 'home.heroTitle' | translate }}
        </h1>
        <p class="text-xl md:text-2xl mb-8 opacity-90">
          {{ 'home.heroSubtitle' | translate }}
        </p>
        <button
          routerLink="/products"
          class="bg-white text-red-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition duration-300 inline-flex items-center gap-2"
        >
          <span>🛍️</span>
          <span>{{ 'home.exploreCTA' | translate }}</span>
        </button>
      </div>
    </section>

    <!-- Categories Showcase -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-12 text-gray-900">
          {{ 'home.categories' | translate }}
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div *ngFor="let category of categories" class="text-center">
            <div class="bg-white rounded-lg p-8 hover:shadow-lg transition cursor-pointer group">
              <div class="text-6xl mb-4 group-hover:scale-110 transition">{{ category.icon }}</div>
              <h3 class="text-xl font-semibold text-gray-900 group-hover:text-red-600 transition">
                {{ category.name }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-12">
          <div>
            <h2 class="text-4xl font-bold text-gray-900">{{ 'home.featuredProducts' | translate }}</h2>
            <p class="text-gray-600 mt-2">{{ 'home.featuredDescription' | translate }}</p>
          </div>
          <a
            routerLink="/products"
            class="text-red-600 hover:text-red-700 font-bold text-lg transition"
          >
            {{ 'common.viewAll' | translate }} →
          </a>
        </div>

        <!-- Loading State -->
        <div *ngIf="!featuredProducts$" class="text-center py-12">
          <p class="text-gray-600">{{ 'common.loading' | translate }}</p>
        </div>

        <!-- Products Grid -->
        <div *ngIf="featuredProducts$ | async as products" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <app-product-card
            *ngFor="let product of products; trackBy: trackByProductId"
            [product]="product"
            (addedToCart)="onProductAdded($event)"
          ></app-product-card>
        </div>

        <!-- No Products Message -->
        <div *ngIf="(featuredProducts$ | async)?.length === 0" class="text-center py-12">
          <p class="text-gray-600 text-lg">{{ 'home.noFeaturedProducts' | translate }}</p>
        </div>
      </div>
    </section>

    <!-- Trust Section -->
    <section class="bg-gray-900 text-white py-16 px-4">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="text-5xl mb-4">🚚</div>
          <h3 class="text-2xl font-bold mb-2">{{ 'home.freeDelivery' | translate }}</h3>
          <p class="text-gray-400">{{ 'home.freeDeliveryDesc' | translate }}</p>
        </div>
        <div class="text-center">
          <div class="text-5xl mb-4">✓</div>
          <h3 class="text-2xl font-bold mb-2">{{ 'home.qualityGuarantee' | translate }}</h3>
          <p class="text-gray-400">{{ 'home.qualityGuaranteeDesc' | translate }}</p>
        </div>
        <div class="text-center">
          <div class="text-5xl mb-4">💬</div>
          <h3 class="text-2xl font-bold mb-2">{{ 'home.customerSupport' | translate }}</h3>
          <p class="text-gray-400">{{ 'home.customerSupportDesc' | translate }}</p>
        </div>
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="bg-red-600 text-white py-16 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold mb-4">{{ 'home.newsletter' | translate }}</h2>
        <p class="text-xl mb-8 opacity-90">{{ 'home.newsletterDescription' | translate }}</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="{{ 'home.emailPlaceholder' | translate }}"
            class="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            class="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition duration-300"
          >
            {{ 'home.subscribe' | translate }}
          </button>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  featuredProducts$!: Observable<Product[]>;

  categories = [
    { id: 'mercearia', name: 'Mercearia', icon: '🛒' },
    { id: 'talho', name: 'Talho', icon: '🥩' },
    { id: 'peixaria', name: 'Peixaria', icon: '🐟' },
    { id: 'cosmeticos', name: 'Cosméticos', icon: '💄' }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.featuredProducts$ = this.productService.getFeaturedProducts();
  }

  onProductAdded(product: Product): void {
    // Product was added to cart - notification is handled by the service
    console.log('Product added to cart:', product.name);
  }

  trackByProductId(index: number, product: Product): string {
    return product.id;
  }
}

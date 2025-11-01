import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, Observable, debounceTime, switchMap } from 'rxjs';
import { ProductService, Product, ProductFilter } from '../../../core/services/product.service';
import { CategoryService, Category } from '../../../core/services/category.service';
import { ProductCardComponent } from '../../../shared/components/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, TranslateModule, ProductCardComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Page Header -->
      <section class="bg-white border-b border-gray-200 py-8 px-4 sticky top-20 z-40">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ 'products.title' | translate }}</h1>
          <p class="text-gray-600">{{ 'products.subtitle' | translate }}</p>
        </div>
      </section>

      <!-- Filters and Products -->
      <div class="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Filters Sidebar -->
        <aside class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-6 space-y-6">
            <!-- Search -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-3">
                {{ 'filters.search' | translate }}
              </label>
              <input
                type="text"
                [(ngModel)]="filters.search"
                (ngModelChange)="onFilterChange()"
                placeholder="{{ 'filters.searchPlaceholder' | translate }}"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <!-- Category Filter -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-3">
                {{ 'filters.category' | translate }}
              </label>
              <select
                [(ngModel)]="filters.category"
                (ngModelChange)="onFilterChange()"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="">{{ 'filters.allCategories' | translate }}</option>
                <option *ngFor="let cat of categories$ | async" [value]="cat.id">
                  {{ cat.icon }} {{ cat.name }}
                </option>
              </select>
            </div>

            <!-- Price Range -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-3">
                {{ 'filters.priceRange' | translate }}
              </label>
              <div class="space-y-2">
                <div>
                  <label class="text-xs text-gray-600">{{ 'filters.minPrice' | translate }}:</label>
                  <input
                    type="number"
                    [(ngModel)]="filters.priceMin"
                    (ngModelChange)="onFilterChange()"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label class="text-xs text-gray-600">{{ 'filters.maxPrice' | translate }}:</label>
                  <input
                    type="number"
                    [(ngModel)]="filters.priceMax"
                    (ngModelChange)="onFilterChange()"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>
            </div>

            <!-- Sort Options -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-3">
                {{ 'filters.sortBy' | translate }}
              </label>
              <select
                [(ngModel)]="filters.sortBy"
                (ngModelChange)="onFilterChange()"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="relevance">{{ 'filters.relevance' | translate }}</option>
                <option value="price-asc">{{ 'filters.priceLowToHigh' | translate }}</option>
                <option value="price-desc">{{ 'filters.priceHighToLow' | translate }}</option>
                <option value="newest">{{ 'filters.newest' | translate }}</option>
                <option value="rating">{{ 'filters.topRated' | translate }}</option>
              </select>
            </div>

            <!-- Checkboxes -->
            <div class="space-y-3">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  [(ngModel)]="filters.inStockOnly"
                  (ngModelChange)="onFilterChange()"
                  class="w-4 h-4 text-red-600 rounded"
                />
                <span class="text-sm text-gray-700">{{ 'filters.inStockOnly' | translate }}</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  [(ngModel)]="filters.onPromotion"
                  (ngModelChange)="onFilterChange()"
                  class="w-4 h-4 text-red-600 rounded"
                />
                <span class="text-sm text-gray-700">{{ 'filters.onPromotion' | translate }}</span>
              </label>
            </div>

            <!-- Reset Button -->
            <button
              (click)="resetFilters()"
              class="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-red-600 hover:text-red-600 transition font-semibold"
            >
              {{ 'filters.reset' | translate }}
            </button>
          </div>
        </aside>

        <!-- Products Grid -->
        <main class="lg:col-span-3">
          <!-- Loading State -->
          <div *ngIf="!products$" class="text-center py-12">
            <p class="text-gray-600 text-lg">{{ 'common.loading' | translate }}</p>
          </div>

          <!-- Products -->
          <div *ngIf="products$ | async as products" [class.grid]="products.length > 0" class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <app-product-card
              *ngFor="let product of products; trackBy: trackByProductId"
              [product]="product"
              (addedToCart)="onProductAdded($event)"
            ></app-product-card>
          </div>

          <!-- No Products Found -->
          <div *ngIf="(products$ | async)?.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4">😟</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ 'products.noResults' | translate }}</h3>
            <p class="text-gray-600 mb-6">{{ 'products.noResultsDescription' | translate }}</p>
            <button
              (click)="resetFilters()"
              class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
            >
              {{ 'filters.reset' | translate }}
            </button>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: []
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  categories$ = new BehaviorSubject<Category[]>([]);

  filters: ProductFilter = {
    search: '',
    category: '',
    priceMin: 0,
    priceMax: 500,
    sortBy: 'relevance',
    inStockOnly: false,
    onPromotion: false
  };

  private filterSubject = new BehaviorSubject<ProductFilter>(this.filters);

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    // Load categories
    this.categoryService.getCategories().subscribe(categories => {
      this.categories$.next(categories);
    });

    // Setup reactive product loading
    this.products$ = this.filterSubject.pipe(
      debounceTime(300),
      switchMap(filters => this.productService.getProductsWithFilters(filters))
    );

    // Load initial products
    this.filterSubject.next(this.filters);
  }

  onFilterChange(): void {
    this.filterSubject.next({ ...this.filters });
  }

  resetFilters(): void {
    this.filters = {
      search: '',
      category: '',
      priceMin: 0,
      priceMax: 500,
      sortBy: 'relevance',
      inStockOnly: false,
      onPromotion: false
    };
    this.onFilterChange();
  }

  onProductAdded(product: Product): void {
    console.log('Product added to cart:', product.name);
  }

  trackByProductId(index: number, product: Product): string {
    return product.id;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';

import * as ProductActions from '../../../store/products/products.actions';
import * as fromProducts from '../../../store/products/products.selectors';
import * as CartActions from '../../../store/cart/cart.actions';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ 'products.title' | translate }}</h1>
        <p class="text-gray-600">{{ 'products.allProducts' | translate }}</p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Filters -->
        <aside class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-lg p-6 sticky top-24">
            <h2 class="text-xl font-bold text-gray-900 mb-6">{{ 'products.filters.title' | translate }}</h2>

            <form [formGroup]="filterForm" class="space-y-6">
              <!-- Category Filter -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">
                  {{ 'products.filters.category' | translate }}
                </label>
                <div class="space-y-2">
                  <label *ngFor="let cat of categories" class="flex items-center">
                    <input
                      type="checkbox"
                      [value]="cat.id"
                      (change)="onCategoryChange($event)"
                      class="rounded border-gray-300 text-red-600 shadow-sm"
                    />
                    <span class="ml-2 text-sm text-gray-700">{{ cat.name | translate }}</span>
                  </label>
                </div>
              </div>

              <!-- Price Range Filter -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">
                  {{ 'products.filters.priceRange' | translate }}
                </label>
                <div class="space-y-2">
                  <div>
                    <label class="text-xs text-gray-600">Min: {{ minPrice | currency }}</label>
                    <input
                      type="range"
                      formControlName="minPrice"
                      min="0"
                      max="500"
                      step="10"
                      class="w-full"
                    />
                  </div>
                  <div>
                    <label class="text-xs text-gray-600">Max: {{ maxPrice | currency }}</label>
                    <input
                      type="range"
                      formControlName="maxPrice"
                      min="0"
                      max="500"
                      step="10"
                      class="w-full"
                    />
                  </div>
                </div>
              </div>

              <!-- Stock Status Filter -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">
                  {{ 'products.filters.stockStatus' | translate }}
                </label>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      formControlName="inStockOnly"
                      class="rounded border-gray-300 text-red-600"
                    />
                    <span class="ml-2 text-sm text-gray-700">{{ 'products.inStock' | translate }}</span>
                  </label>
                </div>
              </div>

              <!-- Rating Filter -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">
                  {{ 'products.filters.rating' | translate }}
                </label>
                <div class="space-y-2">
                  <label *ngFor="let rating of [5, 4, 3, 2, 1]" class="flex items-center">
                    <input
                      type="checkbox"
                      [value]="rating"
                      (change)="onRatingChange($event)"
                      class="rounded border-gray-300 text-red-600"
                    />
                    <span class="ml-2 text-sm text-gray-700">
                      {{ rating }} {{ rating === 1 ? 'star' : 'stars' }}
                    </span>
                  </label>
                </div>
              </div>

              <!-- Promotion Filter -->
              <div>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    formControlName="onPromotion"
                    class="rounded border-gray-300 text-red-600"
                  />
                  <span class="ml-2 text-sm text-gray-700">
                    {{ 'products.filters.promotion' | translate }}
                  </span>
                </label>
              </div>

              <!-- Clear Filters -->
              <button
                type="button"
                (click)="onClearFilters()"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
              >
                {{ 'common.clear' | translate }}
              </button>
            </form>
          </div>
        </aside>

        <!-- Products Grid -->
        <div class="lg:col-span-3">
          <!-- Search and Sort Bar -->
          <div class="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div class="w-full md:flex-1">
              <input
                type="text"
                placeholder="{{ 'common.search' | translate }}"
                (input)="onSearch($event)"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <select
              (change)="onSortChange($event)"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="relevance">{{ 'products.sorting.relevance' | translate }}</option>
              <option value="price-asc">{{ 'products.sorting.priceLowToHigh' | translate }}</option>
              <option value="price-desc">{{ 'products.sorting.priceHighToLow' | translate }}</option>
              <option value="newest">{{ 'products.sorting.newest' | translate }}</option>
              <option value="popularity">{{ 'products.sorting.popularity' | translate }}</option>
              <option value="rating">{{ 'products.sorting.rating' | translate }}</option>
            </select>
          </div>

          <!-- Loading State -->
          <div *ngIf="isLoading$ | async" class="flex justify-center items-center h-64">
            <div class="text-center">
              <div class="inline-block">
                <svg class="animate-spin h-12 w-12 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p class="mt-4 text-gray-600">{{ 'common.loading' | translate }}</p>
            </div>
          </div>

          <!-- Products Grid -->
          <div *ngIf="!(isLoading$ | async)" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              *ngFor="let product of (products$ | async)"
              class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <!-- Product Image -->
              <div class="relative bg-gray-200 h-48 overflow-hidden">
                <img
                  [src]="product.image || 'assets/placeholder.png'"
                  [alt]="product.name"
                  class="w-full h-full object-cover hover:scale-105 transition-transform"
                />
                <!-- Badge -->
                <div *ngIf="product.isPromotion" class="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {{ product.discount }}% OFF
                </div>
                <div *ngIf="product.isTopSeller" class="absolute top-2 left-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  🏆 {{ 'products.topSeller' | translate }}
                </div>
              </div>

              <!-- Product Info -->
              <div class="p-4">
                <!-- Category -->
                <p class="text-xs text-gray-500 uppercase font-semibold mb-2">
                  {{ getCategoryName(product.categoryId) | translate }}
                </p>

                <!-- Name -->
                <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {{ product.name }}
                </h3>

                <!-- Rating -->
                <div class="flex items-center mb-2">
                  <div class="flex text-yellow-400">
                    <span *ngFor="let i of [1,2,3,4,5]" [class.opacity-30]="i > (product?.rating || 0)">
                      ★
                    </span>
                  </div>
                  <span class="text-xs text-gray-600 ml-2">({{ product.reviews }} {{ 'products.reviews' | translate | lowercase }})</span>
                </div>

                <!-- Price -->
                <div class="flex items-baseline gap-2 mb-4">
                  <span class="text-2xl font-bold text-red-600">
                    {{ product.price | currency }}
                  </span>
                  <span *ngIf="product.originalPrice" class="text-sm text-gray-500 line-through">
                    {{ product.originalPrice | currency }}
                  </span>
                </div>

                <!-- Stock Status -->
                <div class="mb-4">
                  <span
                    *ngIf="product.inStock"
                    class="text-xs font-semibold text-green-600"
                  >
                    ✓ {{ 'products.inStock' | translate }}
                  </span>
                  <span
                    *ngIf="!product.inStock"
                    class="text-xs font-semibold text-red-600"
                  >
                    {{ 'products.outOfStock' | translate }}
                  </span>
                </div>

                <!-- Add to Cart Button -->
                <button
                  (click)="onAddToCart(product)"
                  [disabled]="!product.inStock"
                  class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
                >
                  {{ 'products.addToCart' | translate }}
                </button>

                <!-- View Details Link -->
                <a
                  [routerLink]="['/products', product.id]"
                  class="block text-center mt-2 text-red-600 hover:text-red-700 text-sm font-semibold"
                >
                  {{ 'products.viewDetails' | translate }} →
                </a>
              </div>
            </div>
          </div>

          <!-- No Products Found -->
          <div *ngIf="!(isLoading$ | async) && !(products$ | async)?.length" class="text-center py-12">
            <p class="text-gray-600 text-lg mb-4">{{ 'products.noProductsFound' | translate }}</p>
            <button
              (click)="onClearFilters()"
              class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
            >
              {{ 'common.clear' | translate }} {{ 'products.filters.title' | translate | lowercase }}
            </button>
          </div>

          <!-- Load More Button -->
          <div *ngIf="(hasMore$ | async)" class="flex justify-center mt-12">
            <button
              (click)="onLoadMore()"
              class="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
            >
              {{ 'common.loadMore' | translate }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
  filterForm!: FormGroup;
  isLoading$ = this.store.select(fromProducts.selectIsLoading);
  products$ = this.store.select(fromProducts.selectAllProducts);
  hasMore$ = this.store.select(fromProducts.selectHasMore);

  categories = [
    { id: 'mercearia', name: 'products.categories.mercearia' },
    { id: 'talho', name: 'products.categories.talho' },
    { id: 'peixaria', name: 'products.categories.peixaria' },
    { id: 'cosmeticos', name: 'products.categories.cosmeticos' },
    { id: 'produtosCaboVerde', name: 'products.categories.produtosCaboVerde' },
    { id: 'outros', name: 'products.categories.outros' }
  ];

  minPrice = 0;
  maxPrice = 500;

  private destroy$ = new Subject<void>();
  private searchSubject$ = new Subject<string>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Load initial products
    this.store.dispatch(
      ProductActions.loadProducts({
        filters: {
          categories: [],
          minPrice: 0,
          maxPrice: 500,
          inStockOnly: false,
          ratings: [],
          onPromotion: false,
          searchQuery: ''
        },
        sortBy: 'relevance',
        page: 1,
        limit: 12
      })
    );

    // Handle search with debounce
    this.searchSubject$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((query) => {
        this.applyFilters(query);
      });

    // Check for query params (category from home page)
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params['category']) {
        this.filterForm.patchValue({
          category: params['category']
        });
        this.applyFilters();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.filterForm = this.formBuilder.group({
      minPrice: [0],
      maxPrice: [500],
      inStockOnly: [false],
      onPromotion: [false]
    });

    this.filterForm.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.applyFilters();
      });
  }

  onSearch(event: any): void {
    const query = event.target.value;
    this.searchSubject$.next(query);
  }

  onCategoryChange(event: any): void {
    this.applyFilters();
  }

  onRatingChange(event: any): void {
    this.applyFilters();
  }

  onSortChange(event: any): void {
    this.applyFilters(undefined, event.target.value);
  }

  onAddToCart(product: any): void {
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      categoryId: product.categoryId
    };
    this.store.dispatch(CartActions.addItem({ item: cartItem }));
  }

  onClearFilters(): void {
    this.filterForm.reset({
      minPrice: 0,
      maxPrice: 500,
      inStockOnly: false,
      onPromotion: false
    });
    this.applyFilters('');
  }

  onLoadMore(): void {
    // TODO: Implement pagination
  }

  getCategoryName(categoryId: string): string {
    const cat = this.categories.find((c) => c.id === categoryId);
    return cat?.name || 'products.categories.outros';
  }

  private applyFilters(searchQuery?: string, sortBy?: string): void {
    const { minPrice, maxPrice, inStockOnly, onPromotion } = this.filterForm.value;

    this.minPrice = minPrice;
    this.maxPrice = maxPrice;

    this.store.dispatch(
      ProductActions.loadProducts({
        filters: {
          categories: [],
          minPrice,
          maxPrice,
          inStockOnly,
          ratings: [],
          onPromotion,
          searchQuery: searchQuery || ''
        },
        sortBy: sortBy || 'relevance',
        page: 1,
        limit: 12
      })
    );
  }
}

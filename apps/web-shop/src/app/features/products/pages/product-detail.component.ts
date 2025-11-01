import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';

import * as ProductActions from '../../../store/products/products.actions';
import * as fromProducts from '../../../store/products/products.selectors';
import * as CartActions from '../../../store/cart/cart.actions';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <div class="mb-8 text-sm text-gray-600">
        <a routerLink="/" class="text-red-600 hover:text-red-700">{{ 'common.home' | translate }}</a>
        <span class="mx-2">/</span>
        <a routerLink="/products" class="text-red-600 hover:text-red-700">{{ 'products.title' | translate }}</a>
        <span class="mx-2">/</span>
        <span class="text-gray-900 font-semibold">{{ (product$ | async)?.name }}</span>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading$ | async" class="flex justify-center items-center h-96">
        <div class="text-center">
          <svg class="animate-spin h-12 w-12 text-red-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600">{{ 'common.loading' | translate }}</p>
        </div>
      </div>

      <!-- Product Detail -->
      <div *ngIf="product$ | async as product" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Product Images -->
        <div>
          <!-- Main Image -->
          <div class="relative bg-gray-100 rounded-lg overflow-hidden mb-4 h-96">
            <img
              [src]="product.image || 'assets/placeholder.png'"
              [alt]="product.name"
              class="w-full h-full object-cover"
            />
            <!-- Badges -->
            <div *ngIf="product.isPromotion" class="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
              {{ product.discount }}% OFF
            </div>
            <div *ngIf="product.isTopSeller" class="absolute top-4 left-4 bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold">
              🏆 {{ 'products.topSeller' | translate }}
            </div>
          </div>

          <!-- Thumbnail Gallery -->
          <div class="grid grid-cols-4 gap-2">
            <div *ngFor="let img of [product.image, product.image, product.image, product.image]" class="bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-70 transition">
              <img [src]="img || 'assets/placeholder.png'" [alt]="product.name" class="w-full h-20 object-cover" />
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <!-- Category & Rating -->
          <p class="text-sm text-gray-600 uppercase font-semibold mb-2">
            {{ getCategoryName(product.categoryId) | translate }}
          </p>

          <!-- Product Name -->
          <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ product.name }}</h1>

          <!-- Rating -->
          <div class="flex items-center mb-6">
            <div class="flex text-yellow-400 text-xl">
              <span *ngFor="let i of [1,2,3,4,5]" [class.opacity-30]="i > (product?.rating || 0)">★</span>
            </div>
            <span class="text-gray-600 ml-4">
              {{ product?.rating || 0 }} / 5 ({{ product.reviews }} {{ 'products.reviews' | translate | lowercase }})
            </span>
          </div>

          <!-- Price Section -->
          <div class="mb-6 pb-6 border-b border-gray-200">
            <div class="flex items-baseline gap-3 mb-2">
              <span class="text-4xl font-bold text-red-600">{{ product.price | currency }}</span>
              <span *ngIf="product.originalPrice" class="text-xl text-gray-500 line-through">
                {{ product.originalPrice | currency }}
              </span>
              <span *ngIf="product.discount" class="text-xl font-bold text-red-600">
                -{{ product.discount }}%
              </span>
            </div>
            <p class="text-sm text-gray-600">
              {{ 'common.currency' | translate }} {{ product.price | number: '1.2-2' }}
            </p>
          </div>

          <!-- Stock Status -->
          <div class="mb-6">
            <span *ngIf="product.inStock" class="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
              ✓ {{ 'products.inStock' | translate }}
            </span>
            <span *ngIf="!product.inStock" class="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold">
              {{ 'products.outOfStock' | translate }}
            </span>
          </div>

          <!-- Add to Cart Form -->
          <form [formGroup]="quantityForm" (ngSubmit)="onAddToCart(product)" class="mb-8">
            <div class="flex items-center gap-4 mb-4">
              <label class="text-sm font-semibold text-gray-700">{{ 'products.quantity' | translate }}:</label>
              <div class="flex items-center border border-gray-300 rounded-lg">
                <button
                  type="button"
                  (click)="decrementQuantity()"
                  class="px-4 py-2 text-gray-600 hover:text-gray-900 font-bold"
                >
                  −
                </button>
                <input
                  type="number"
                  formControlName="quantity"
                  class="w-16 text-center border-0 focus:outline-none"
                />
                <button
                  type="button"
                  (click)="incrementQuantity()"
                  class="px-4 py-2 text-gray-600 hover:text-gray-900 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="submit"
              [disabled]="!product.inStock"
              class="w-full px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition mb-3"
            >
              🛒 {{ 'products.addToCart' | translate }}
            </button>

            <button
              type="button"
              class="w-full px-6 py-3 border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold rounded-lg transition"
            >
              ❤️ {{ 'common.save' | translate }}
            </button>
          </form>

          <!-- Product Features -->
          <div class="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 class="text-lg font-bold text-gray-900 mb-4">{{ 'products.details' | translate }}</h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <span class="text-red-600 font-bold mr-3">✓</span>
                <span class="text-gray-700">Entrega Gratuita em Almada para encomendas acima de €30</span>
              </li>
              <li class="flex items-start">
                <span class="text-red-600 font-bold mr-3">✓</span>
                <span class="text-gray-700">Produto Original e Autêntico</span>
              </li>
              <li class="flex items-start">
                <span class="text-red-600 font-bold mr-3">✓</span>
                <span class="text-gray-700">Garantia de Qualidade</span>
              </li>
              <li class="flex items-start">
                <span class="text-red-600 font-bold mr-3">✓</span>
                <span class="text-gray-700">Suporte ao Cliente 24/7</span>
              </li>
            </ul>
          </div>

          <!-- Share & Additional Info -->
          <div class="border-t border-gray-200 pt-6">
            <div class="mb-4">
              <p class="text-sm text-gray-600 mb-2">
                <strong>SKU:</strong> {{ product.sku || 'N/A' }}
              </p>
              <p class="text-sm text-gray-600">
                <strong>{{ 'products.category' | translate }}:</strong> {{ getCategoryName(product.categoryId) | translate }}
              </p>
            </div>

            <!-- Share Buttons -->
            <div class="flex gap-4 mt-6">
              <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-semibold text-sm">
                📱 Partilhar
              </button>
              <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-semibold text-sm">
                📧 Enviar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Description & Tabs -->
      <div *ngIf="product$ | async as product" class="mt-12">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ 'products.description' | translate }}</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{ product.description || 'Descrição do produto não disponível' }}
          </p>

          <!-- Specifications (if available) -->
          <div *ngIf="product.specifications" class="mt-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Especificações</h3>
            <div class="grid grid-cols-2 gap-4">
              <div *ngFor="let spec of product.specifications" class="border-b border-gray-200 pb-2">
                <p class="text-sm font-semibold text-gray-700">{{ spec.name }}</p>
                <p class="text-gray-600">{{ spec.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ 'products.relatedProducts' | translate }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div *ngFor="let relProduct of relatedProducts$ | async" class="bg-white rounded-lg shadow-md hover:shadow-xl transition">
            <div class="bg-gray-200 h-40 overflow-hidden rounded-t-lg">
              <img [src]="relProduct.image" [alt]="relProduct.name" class="w-full h-full object-cover" />
            </div>
            <div class="p-4">
              <h4 class="font-bold text-gray-900 mb-2 line-clamp-2">{{ relProduct.name }}</h4>
              <p class="text-xl font-bold text-red-600 mb-3">{{ relProduct.price | currency }}</p>
              <a
                [routerLink]="['/products', relProduct.id]"
                class="text-center block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold text-sm"
              >
                {{ 'products.viewDetails' | translate }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <div class="mt-12 bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ 'products.reviews' | translate }}</h2>

        <!-- Add Review Button -->
        <button
          (click)="showReviewForm = !showReviewForm"
          class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold mb-6"
        >
          {{ 'products.addReview' | translate }}
        </button>

        <!-- Review Form -->
        <form *ngIf="showReviewForm" [formGroup]="reviewForm" (ngSubmit)="onSubmitReview()" class="bg-gray-50 rounded-lg p-6 mb-8">
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">{{ 'products.rating' | translate }}</label>
            <div class="flex gap-2">
              <button
                *ngFor="let i of [1,2,3,4,5]"
                type="button"
                (click)="setRating(i)"
                class="text-4xl cursor-pointer transition"
                [class.opacity-30]="i > (reviewForm.get('rating')?.value || 0)"
              >
                ★
              </button>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Comentário</label>
            <textarea
              formControlName="comment"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Partilhe a sua opinião..."
            ></textarea>
          </div>

          <button
            type="submit"
            class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
          >
            {{ 'common.save' | translate }}
          </button>
        </form>

        <!-- Reviews List -->
        <div class="space-y-6">
          <div *ngFor="let review of reviews" class="border-b border-gray-200 pb-6">
            <div class="flex justify-between items-start mb-2">
              <div>
                <p class="font-bold text-gray-900">{{ review.author }}</p>
                <p class="text-sm text-gray-600">{{ review.date | date: 'dd/MM/yyyy' }}</p>
              </div>
              <div class="text-yellow-400">
                <span *ngFor="let i of [1,2,3,4,5]" [class.opacity-30]="i > review.rating">★</span>
              </div>
            </div>
            <p class="text-gray-700">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  quantityForm!: FormGroup;
  reviewForm!: FormGroup;
  showReviewForm = false;

  product$ = this.store.select(fromProducts.selectSelectedProduct);
  relatedProducts$ = this.store.select(fromProducts.selectRelatedProducts);
  isLoading$ = this.store.select(fromProducts.selectIsLoading);

  reviews: any[] = [
    {
      id: 1,
      author: 'João Silva',
      rating: 5,
      date: new Date('2024-10-15'),
      comment: 'Produto excelente! Qualidade premium e entrega rápida. Muito satisfeito.'
    },
    {
      id: 2,
      author: 'Maria Santos',
      rating: 4,
      date: new Date('2024-10-10'),
      comment: 'Bom produto. Embalagem bem feita. Recomendo!'
    }
  ];

  categories = [
    { id: 'mercearia', name: 'products.categories.mercearia' },
    { id: 'talho', name: 'products.categories.talho' },
    { id: 'peixaria', name: 'products.categories.peixaria' },
    { id: 'cosmeticos', name: 'products.categories.cosmeticos' },
    { id: 'produtosCaboVerde', name: 'products.categories.produtosCaboVerde' },
    { id: 'outros', name: 'products.categories.outros' }
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.quantityForm = this.formBuilder.group({
      quantity: [1, [Validators.required, Validators.min(1)]]
    });

    this.reviewForm = this.formBuilder.group({
      rating: [0, [Validators.required]],
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params['id']) {
        this.store.dispatch(
          ProductActions.loadProductDetail({
            productId: params['id']
          })
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  incrementQuantity(): void {
    const current = this.quantityForm.get('quantity')?.value || 1;
    this.quantityForm.patchValue({ quantity: current + 1 });
  }

  decrementQuantity(): void {
    const current = this.quantityForm.get('quantity')?.value || 1;
    if (current > 1) {
      this.quantityForm.patchValue({ quantity: current - 1 });
    }
  }

  setRating(rating: number): void {
    this.reviewForm.patchValue({ rating });
  }

  onAddToCart(product: any): void {
    const quantity = this.quantityForm.get('quantity')?.value || 1;
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      categoryId: product.categoryId
    };
    this.store.dispatch(CartActions.addItem({ item: cartItem }));
  }

  onSubmitReview(): void {
    if (this.reviewForm.valid) {
      // TODO: Submit review to API
      this.reviews.unshift({
        id: this.reviews.length + 1,
        author: 'Você',
        rating: this.reviewForm.get('rating')?.value,
        date: new Date(),
        comment: this.reviewForm.get('comment')?.value
      });
      this.reviewForm.reset();
      this.showReviewForm = false;
    }
  }

  getCategoryName(categoryId: string): string {
    const cat = this.categories.find((c) => c.id === categoryId);
    return cat?.name || 'products.categories.outros';
  }
}

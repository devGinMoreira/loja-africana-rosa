import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../core/services/product.service';
import { Store } from '@ngrx/store';
import * as CartActions from '../../store/cart/cart.actions';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group">
      <!-- Product Image -->
      <div class="relative overflow-hidden bg-gray-100 h-48">
        <img
          [src]="product.image"
          [alt]="product.name"
          class="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />

        <!-- Promotion Badge -->
        <div *ngIf="product.isPromotion" class="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
          -{{ product.discount }}%
        </div>

        <!-- Stock Status Badge -->
        <div
          *ngIf="!product.inStock"
          class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
        >
          <span class="text-white font-bold text-lg">{{ 'common.outOfStock' | translate }}</span>
        </div>
      </div>

      <!-- Product Info -->
      <div class="p-4 flex flex-col h-full">
        <!-- Category Tag -->
        <span class="text-xs text-gray-500 mb-2">{{ product.categoryId }}</span>

        <!-- Product Name -->
        <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition">
          {{ product.name }}
        </h3>

        <!-- Rating -->
        <div class="flex items-center gap-1 mb-2">
          <div class="flex text-yellow-400">
            <span *ngFor="let star of getStars()">★</span>
            <span *ngFor="let empty of getEmptyStars()" class="text-gray-300">★</span>
          </div>
          <span class="text-sm text-gray-600">({{ product.reviews }})</span>
        </div>

        <!-- Description -->
        <p class="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">
          {{ product.description }}
        </p>

        <!-- Price Section -->
        <div class="mb-4 flex items-baseline gap-2">
          <span class="text-2xl font-bold text-red-600">
            {{ product.price | currency: 'EUR':'symbol':'1.2-2' }}
          </span>
          <span *ngIf="product.originalPrice && product.isPromotion" class="text-sm text-gray-500 line-through">
            {{ product.originalPrice | currency: 'EUR':'symbol':'1.2-2' }}
          </span>
        </div>

        <!-- Stock Info -->
        <div *ngIf="product.inStock" class="text-xs text-gray-600 mb-4">
          {{ 'common.inStock' | translate }}: {{ product.stock }}
        </div>

        <!-- Add to Cart Button -->
        <button
          *ngIf="product.inStock"
          (click)="onAddToCart()"
          class="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2"
        >
          <span>🛒</span>
          <span>{{ 'product.addToCart' | translate }}</span>
        </button>

        <!-- Out of Stock Button -->
        <button
          *ngIf="!product.inStock"
          disabled
          class="w-full bg-gray-300 text-gray-600 py-2 rounded-lg font-semibold cursor-not-allowed"
        >
          {{ 'common.outOfStock' | translate }}
        </button>

        <!-- View Details Link -->
        <a
          [routerLink]="['/products', product.id]"
          class="text-center text-red-600 hover:text-red-700 text-sm font-semibold mt-2 py-2 transition"
        >
          {{ 'product.viewDetails' | translate }} →
        </a>
      </div>
    </div>
  `,
  styles: []
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addedToCart = new EventEmitter<Product>();

  constructor(private store: Store) {}

  onAddToCart(): void {
    // Dispatch action to add to cart
    const cartItem = {
      productId: this.product.id,
      name: this.product.name,
      price: this.product.price,
      quantity: 1,
      image: this.product.image,
      categoryId: this.product.categoryId
    };
    this.store.dispatch(CartActions.addItem({ item: cartItem }));
    this.addedToCart.emit(this.product);
  }

  getStars(): number[] {
    return Array(Math.floor(this.product.rating)).fill(0);
  }

  getEmptyStars(): number[] {
    return Array(5 - Math.floor(this.product.rating)).fill(0);
  }
}

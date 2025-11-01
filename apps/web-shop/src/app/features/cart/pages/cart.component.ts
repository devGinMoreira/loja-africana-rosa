import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';

import * as CartActions from '../../../store/cart/cart.actions';
import * as fromCart from '../../../store/cart/cart.selectors';
import * as fromAuth from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <div class="mb-8 text-sm text-gray-600">
        <a routerLink="/" class="text-red-600 hover:text-red-700">{{ 'common.home' | translate }}</a>
        <span class="mx-2">/</span>
        <span class="text-gray-900 font-semibold">{{ 'cart.title' | translate }}</span>
      </div>

      <!-- Page Title -->
      <h1 class="text-3xl font-bold text-gray-900 mb-8">{{ 'cart.title' | translate }}</h1>

      <!-- Empty Cart State -->
      <div *ngIf="(cartItems$ | async)?.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">🛒</div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ 'cart.empty' | translate }}</h2>
        <p class="text-gray-600 mb-6">{{ 'cart.continueShoppingButton' | translate }}</p>
        <a
          routerLink="/products"
          class="inline-block px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
        >
          {{ 'products.title' | translate }}
        </a>
      </div>

      <!-- Cart with Items -->
      <div *ngIf="(cartItems$ | async)?.length! > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items Section -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">
              {{ (cartItems$ | async)?.length }} {{ 'cart.items' | translate }}
            </h2>

            <!-- Cart Items List -->
            <div class="space-y-6 border-b border-gray-200 pb-6">
              <div *ngFor="let item of cartItems$ | async" class="flex gap-4 pb-6 border-b border-gray-100 last:border-0">
                <!-- Product Image -->
                <div class="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    [src]="item.image || 'assets/placeholder.png'"
                    [alt]="item.name"
                    class="w-full h-full object-cover"
                  />
                </div>

                <!-- Product Details -->
                <div class="flex-1">
                  <a
                    [routerLink]="['/products', item.id]"
                    class="text-lg font-bold text-gray-900 hover:text-red-600 mb-1 line-clamp-2"
                  >
                    {{ item.name }}
                  </a>
                  <p class="text-sm text-gray-600 mb-2">{{ 'products.category' | translate }}: {{ getCategoryName(item.categoryId || '') | translate }}</p>

                  <!-- Price -->
                  <div class="flex items-baseline gap-2 mb-4">
                    <span class="text-xl font-bold text-red-600">
                      {{ (item.price * item.quantity) | currency: 'EUR':'symbol':'1.2-2' }}
                    </span>
                    <span class="text-sm text-gray-600">
                      {{ item.price | currency: 'EUR':'symbol':'1.2-2' }} x {{ item.quantity }}
                    </span>
                  </div>

                  <!-- Quantity Control -->
                  <div class="flex items-center gap-3">
                    <label class="text-sm font-semibold text-gray-700">{{ 'products.quantity' | translate }}:</label>
                    <div class="flex items-center border border-gray-300 rounded-lg">
                      <button
                        (click)="onDecrement(item)"
                        class="px-3 py-1 text-gray-600 hover:text-gray-900 font-bold"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        [value]="item.quantity"
                        (change)="onUpdateQuantity(item, $event)"
                        class="w-12 text-center border-0 focus:outline-none"
                        min="1"
                      />
                      <button
                        (click)="onIncrement(item)"
                        class="px-3 py-1 text-gray-600 hover:text-gray-900 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <!-- Remove Button -->
                    <button
                      (click)="onRemove(item)"
                      class="ml-auto text-red-600 hover:text-red-700 font-semibold text-sm px-3 py-2 hover:bg-red-50 rounded"
                    >
                      {{ 'cart.remove' | translate }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Continue Shopping -->
            <div class="mt-6">
              <a
                routerLink="/products"
                class="text-red-600 hover:text-red-700 font-semibold flex items-center"
              >
                ← {{ 'cart.continueShopping' | translate }}
              </a>
            </div>
          </div>
        </div>

        <!-- Cart Summary Section -->
        <div class="lg:col-span-1">
          <!-- Promo Code -->
          <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">{{ 'cart.promoCode' | translate }}</h3>
            <div class="flex gap-2">
              <input
                [formControl]="promoCodeControl"
                type="text"
                placeholder="Código Promocional"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                (click)="onApplyPromo()"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
              >
                {{ 'cart.applyPromo' | translate }}
              </button>
            </div>
            <div *ngIf="promoError$ | async as error" class="mt-2 text-sm text-red-600">
              {{ error }}
            </div>
            <div *ngIf="(appliedPromoCode$ | async) as promo" class="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p class="text-sm text-green-700">
                ✓ {{ 'cart.promoApplied' | translate }}: {{ promo }}
              </p>
              <button
                (click)="onRemovePromo()"
                class="text-sm text-green-600 hover:text-green-700 font-semibold mt-2"
              >
                {{ 'cart.removePromo' | translate }}
              </button>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="bg-white rounded-lg shadow-lg p-6 sticky top-24">
            <h3 class="text-lg font-bold text-gray-900 mb-6">{{ 'cart.checkout' | translate }}</h3>

            <div class="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <!-- Subtotal -->
              <div class="flex justify-between text-gray-700">
                <span>{{ 'cart.subtotalLabel' | translate }}:</span>
                <span class="font-semibold">{{ (subtotal$ | async) | currency: 'EUR':'symbol':'1.2-2' }}</span>
              </div>

              <!-- Tax (IVA) -->
              <div class="flex justify-between text-gray-700">
                <span>{{ 'cart.taxLabel' | translate }} (13%):</span>
                <span class="font-semibold">{{ (tax$ | async) | currency: 'EUR':'symbol':'1.2-2' }}</span>
              </div>

              <!-- Delivery Fee -->
              <div class="flex justify-between text-gray-700">
                <span>{{ 'cart.deliveryFeeLabel' | translate }}:</span>
                <div class="text-right">
                  <span class="font-semibold">{{ (deliveryFee$ | async) | currency: 'EUR':'symbol':'1.2-2' }}</span>
                  <p *ngIf="(subtotal$ | async)! < 30" class="text-xs text-gray-500 mt-1">
                    🎁 {{ 'cart.freeDelivery' | translate }} acima de €30
                  </p>
                </div>
              </div>

              <!-- Discount -->
              <div *ngIf="(discount$ | async)! > 0" class="flex justify-between text-green-700">
                <span>{{ 'cart.discountLabel' | translate }}:</span>
                <span class="font-semibold">-{{ (discount$ | async) | currency: 'EUR':'symbol':'1.2-2' }}</span>
              </div>
            </div>

            <!-- Total -->
            <div class="flex justify-between items-center mb-8">
              <span class="text-lg font-bold text-gray-900">{{ 'cart.totalLabel' | translate }}:</span>
              <span class="text-3xl font-bold text-red-600">
                {{ (total$ | async) | currency: 'EUR':'symbol':'1.2-2' }}
              </span>
            </div>

            <!-- Estimated Delivery Info -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
              <p class="text-sm text-blue-700">
                <strong>{{ 'cart.estimatedDelivery' | translate }}:</strong> 3-5 {{ 'orders.statusPending' | translate | lowercase }}
              </p>
            </div>

            <!-- Checkout Button -->
            <button
              (click)="onCheckout()"
              [disabled]="(isAuthenticated$ | async) === false"
              class="w-full px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition mb-3"
            >
              {{ 'cart.checkout' | translate }}
            </button>

            <!-- Login Prompt -->
            <div *ngIf="(isAuthenticated$ | async) === false" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p class="text-sm text-yellow-800 mb-3">
                Precisa de estar autenticado para finalizar a compra.
              </p>
              <a
                routerLink="/auth/login"
                class="block text-center px-4 py-2 border border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-100 font-semibold text-sm"
              >
                {{ 'auth.login' | translate }}
              </a>
            </div>

            <!-- Continue Shopping Link -->
            <a
              routerLink="/products"
              class="block text-center mt-4 text-gray-600 hover:text-gray-900 font-semibold text-sm"
            >
              ← {{ 'cart.continueShopping' | translate }}
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems$ = this.store.select(fromCart.selectCartItems);
  subtotal$ = this.store.select(fromCart.selectSubtotal);
  tax$ = this.store.select(fromCart.selectTax);
  deliveryFee$ = this.store.select(fromCart.selectDeliveryFee);
  discount$ = this.store.select(fromCart.selectDiscount);
  total$ = this.store.select(fromCart.selectTotal);
  appliedPromoCode$ = this.store.select(fromCart.selectAppliedPromoCode);
  promoError$ = this.store.select(fromCart.selectPromoError);
  isAuthenticated$ = this.store.select(fromAuth.selectIsAuthenticated);

  promoCodeControl = this.formBuilder.control('');

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
    private store: Store,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // No additional initialization needed - cart is managed by store
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onIncrement(item: any): void {
    this.store.dispatch(
      CartActions.updateItem({
        productId: item.id,
        quantity: item.quantity + 1
      })
    );
  }

  onDecrement(item: any): void {
    if (item.quantity > 1) {
      this.store.dispatch(
        CartActions.updateItem({
          productId: item.id,
          quantity: item.quantity - 1
        })
      );
    }
  }

  onUpdateQuantity(item: any, event: any): void {
    const newQuantity = parseInt(event.target.value) || 1;
    if (newQuantity > 0) {
      this.store.dispatch(
        CartActions.updateItem({
          productId: item.id,
          quantity: newQuantity
        })
      );
    }
  }

  onRemove(item: any): void {
    this.store.dispatch(
      CartActions.removeItem({
        productId: item.id
      })
    );
  }

  onApplyPromo(): void {
    const code = this.promoCodeControl.value;
    if (code && code.trim()) {
      this.store.dispatch(
        CartActions.applyPromoCode({
          code: code.trim()
        })
      );
      this.promoCodeControl.reset();
    }
  }

  onRemovePromo(): void {
    this.store.dispatch(CartActions.removePromoCode());
  }

  onCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  getCategoryName(categoryId: string): string {
    const cat = this.categories.find((c) => c.id === categoryId);
    return cat?.name || 'products.categories.outros';
  }
}

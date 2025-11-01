import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import * as fromCart from '../../store/cart/cart.selectors';
import * as CartActions from '../../store/cart/cart.actions';

@Component({
  selector: 'app-mini-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <div class="relative group">
      <!-- Cart Icon with Badge -->
      <a
        routerLink="/cart"
        class="relative px-3 py-2 text-gray-700 hover:text-red-600 font-semibold flex items-center space-x-1"
      >
        <span class="text-xl">🛒</span>
        <span *ngIf="(itemCount$ | async) as count" class="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {{ count }}
        </span>
      </a>

      <!-- Mini Cart Dropdown (Desktop Only) -->
      <div class="hidden md:block absolute right-0 mt-0 w-80 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <!-- Cart Items -->
        <div class="max-h-96 overflow-y-auto border-b border-gray-200">
          <div *ngIf="(cartItems$ | async)?.length === 0" class="p-4 text-center text-gray-600">
            <p>{{ 'cart.empty' | translate }}</p>
          </div>

          <div *ngFor="let item of cartItems$ | async" class="p-3 border-b border-gray-100 last:border-0 flex gap-3 hover:bg-gray-50">
            <!-- Product Image -->
            <div class="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
              <img [src]="item.image || 'assets/placeholder.png'" [alt]="item.name" class="w-full h-full object-cover" />
            </div>

            <!-- Product Details -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 line-clamp-1">{{ item.name }}</p>
              <p class="text-xs text-gray-600">{{ item.quantity }} x {{ item.price | currency: 'EUR':'symbol':'1.2-2' }}</p>
              <p class="text-sm font-bold text-red-600">{{ (item.price * item.quantity) | currency: 'EUR':'symbol':'1.2-2' }}</p>
            </div>

            <!-- Remove Button -->
            <button
              (click)="onRemove(item)"
              class="text-gray-400 hover:text-red-600 text-lg flex-shrink-0"
              title="Remover do carrinho"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Mini Cart Footer -->
        <div *ngIf="(cartItems$ | async)?.length! > 0" class="p-4 space-y-3">
          <!-- Total -->
          <div class="flex justify-between items-center pb-3 border-b border-gray-200">
            <span class="font-semibold text-gray-700">{{ 'cart.totalLabel' | translate }}:</span>
            <span class="text-lg font-bold text-red-600">{{ (total$ | async) | currency: 'EUR':'symbol':'1.2-2' }}</span>
          </div>

          <!-- View Cart Button -->
          <a
            routerLink="/cart"
            class="block text-center px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-semibold text-sm"
          >
            {{ 'cart.title' | translate }}
          </a>

          <!-- Checkout Button -->
          <a
            routerLink="/checkout"
            class="block text-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold text-sm"
          >
            {{ 'cart.checkout' | translate }}
          </a>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MiniCartComponent implements OnInit {
  cartItems$ = this.store.select(fromCart.selectCartItems);
  itemCount$ = this.store.select(fromCart.selectItemCount);
  total$ = this.store.select(fromCart.selectTotal);

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Mini cart data is already managed by store
  }

  onRemove(item: any): void {
    this.store.dispatch(
      CartActions.removeItem({
        productId: item.id
      })
    );
  }
}

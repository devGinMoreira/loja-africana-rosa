import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: false,
  template: `
    <div class="space-y-12">
      <!-- Hero Section -->
      <section class="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ 'common.appName' | translate }}</h1>
          <p class="text-xl mb-8 opacity-90">Produtos Africanos Autênticos em Almada</p>
          <button routerLink="/products" class="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            {{ 'products.title' | translate }}
          </button>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8">{{ 'products.filters.category' | translate }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <a routerLink="/products" [queryParams]="{category: 'mercearia'}" class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer text-center">
            <div class="text-4xl mb-2">🥬</div>
            <p class="font-semibold text-sm">{{ 'products.categories.mercearia' | translate }}</p>
          </a>
          <a routerLink="/products" [queryParams]="{category: 'talho'}" class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer text-center">
            <div class="text-4xl mb-2">🥩</div>
            <p class="font-semibold text-sm">{{ 'products.categories.talho' | translate }}</p>
          </a>
          <a routerLink="/products" [queryParams]="{category: 'peixaria'}" class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer text-center">
            <div class="text-4xl mb-2">🐟</div>
            <p class="font-semibold text-sm">{{ 'products.categories.peixaria' | translate }}</p>
          </a>
          <a routerLink="/products" [queryParams]="{category: 'cosmeticos'}" class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer text-center">
            <div class="text-4xl mb-2">💄</div>
            <p class="font-semibold text-sm">{{ 'products.categories.cosmeticos' | translate }}</p>
          </a>
          <a routerLink="/products" [queryParams]="{category: 'produtosCaboVerde'}" class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer text-center">
            <div class="text-4xl mb-2">🎁</div>
            <p class="font-semibold text-sm">{{ 'products.categories.produtosCaboVerde' | translate }}</p>
          </a>
          <a routerLink="/products" [queryParams]="{category: 'outros'}" class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer text-center">
            <div class="text-4xl mb-2">📦</div>
            <p class="font-semibold text-sm">{{ 'products.categories.outros' | translate }}</p>
          </a>
        </div>
      </section>

      <!-- Features Section -->
      <section class="bg-gray-100 py-12">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="text-5xl mb-4">🚚</div>
              <h3 class="text-xl font-bold mb-2">{{ 'cart.freeDelivery' | translate }}</h3>
              <p class="text-gray-600">{{ 'cart.freeDeliveryInfo' | translate }}</p>
            </div>
            <div class="text-center">
              <div class="text-5xl mb-4">💳</div>
              <h3 class="text-xl font-bold mb-2">{{ 'checkout.paymentMethods' | translate }}</h3>
              <p class="text-gray-600">{{ 'checkout.creditCard' | translate }} / {{ 'checkout.bankTransfer' | translate }}</p>
            </div>
            <div class="text-center">
              <div class="text-5xl mb-4">🔒</div>
              <h3 class="text-xl font-bold mb-2">Segurança</h3>
              <p class="text-gray-600">Pagamento seguro com encriptação</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [],
  imports: [CommonModule, RouterModule, TranslateModule]
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Load featured products
  }
}

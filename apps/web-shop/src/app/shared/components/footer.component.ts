import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <footer class="bg-gray-900 text-gray-100 mt-16">
      <!-- Main Footer Content -->
      <div class="max-w-7xl mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <!-- Company Info -->
          <div>
            <h3 class="text-2xl font-bold text-red-600 mb-4">
              🏪 {{ 'common.appName' | translate }}
            </h3>
            <p class="text-gray-400 text-sm mb-4">
              Produtos Africanos Autênticos em Almada, Portugal
            </p>
            <div class="space-y-2 text-sm text-gray-400">
              <p>
                <strong class="text-white">{{ 'footer.address' | translate }}:</strong>
                <br />
                Almada, Portugal
              </p>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-lg font-semibold text-white mb-4">{{ 'common.home' | translate }}</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <a routerLink="/" class="hover:text-red-600 transition">
                  {{ 'header.welcome' | translate }}
                </a>
              </li>
              <li>
                <a routerLink="/products" class="hover:text-red-600 transition">
                  {{ 'products.title' | translate }}
                </a>
              </li>
              <li>
                <a routerLink="/cart" class="hover:text-red-600 transition">
                  {{ 'cart.title' | translate }}
                </a>
              </li>
              <li>
                <a routerLink="/orders" class="hover:text-red-600 transition">
                  {{ 'orders.title' | translate }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Customer Service -->
          <div>
            <h4 class="text-lg font-semibold text-white mb-4">{{ 'footer.contact' | translate }}</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <a href="mailto:info@lojaafricanarosa.pt" class="hover:text-red-600 transition">
                  {{ 'footer.email' | translate }}
                </a>
              </li>
              <li>
                <a href="tel:+351212123456" class="hover:text-red-600 transition">
                  {{ 'footer.phone' | translate }}
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-red-600 transition">
                  {{ 'footer.about' | translate }}
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-red-600 transition">
                  {{ 'common.contact' | translate }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h4 class="text-lg font-semibold text-white mb-4">{{ 'common.about' | translate }}</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" class="hover:text-red-600 transition">
                  {{ 'footer.privacy' | translate }}
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-red-600 transition">
                  {{ 'footer.terms' | translate }}
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-red-600 transition">
                  {{ 'footer.about' | translate }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Social Media -->
        <div class="border-t border-gray-800 pt-8 mb-8">
          <h4 class="text-lg font-semibold text-white mb-4">{{ 'footer.followUs' | translate }}</h4>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-red-600 text-2xl transition">
              f
            </a>
            <a href="#" class="text-gray-400 hover:text-red-600 text-2xl transition">
              🐦
            </a>
            <a href="#" class="text-gray-400 hover:text-red-600 text-2xl transition">
              📷
            </a>
            <a href="#" class="text-gray-400 hover:text-red-600 text-2xl transition">
              in
            </a>
          </div>
        </div>

        <!-- Copyright -->
        <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>{{ 'footer.copyright' | translate }}</p>
          <p class="mt-2 text-xs">
            Developed by <strong>Ginquel Moreira</strong> - Limitless GMTech Solutions, Lda
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {}

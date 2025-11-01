import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { OrderService } from '../../../core/services/order.service';
import { selectUserOrders } from '../../../store/orders/orders.selectors';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <section class="bg-white border-b border-gray-200 py-8 px-4">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ 'orders.title' | translate }}</h1>
          <p class="text-gray-600">{{ 'orders.subtitle' | translate }}</p>
        </div>
      </section>

      <!-- Content -->
      <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Loading State -->
        <div *ngIf="!orders$" class="text-center py-12">
          <p class="text-gray-600 text-lg">{{ 'common.loading' | translate }}</p>
        </div>

        <!-- Orders List -->
        <div *ngIf="orders$ | async as orders" class="space-y-6">
          <!-- No Orders -->
          <div *ngIf="orders.length === 0" class="bg-white rounded-lg shadow p-12 text-center">
            <div class="text-6xl mb-4">📦</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ 'orders.noOrders' | translate }}</h3>
            <p class="text-gray-600 mb-6">{{ 'orders.noOrdersDesc' | translate }}</p>
            <a routerLink="/products" class="inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">
              {{ 'orders.continueShopping' | translate }}
            </a>
          </div>

          <!-- Order Cards -->
          <div *ngFor="let order of orders" class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
            <div class="p-6 border-b border-gray-200">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <p class="text-sm text-gray-600">{{ 'orders.orderNumber' | translate }}</p>
                  <p class="text-2xl font-bold text-gray-900">{{ order.orderNumber }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm text-gray-600">{{ 'orders.orderDate' | translate }}</p>
                  <p class="text-lg font-semibold text-gray-900">{{ order.createdAt | date: 'dd MMM yyyy' }}</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <span class="px-3 py-1 rounded-full text-sm font-semibold"
                  [class.bg-yellow-100]="order.status === 'pending'"
                  [class.text-yellow-800]="order.status === 'pending'"
                  [class.bg-blue-100]="order.status === 'processing'"
                  [class.text-blue-800]="order.status === 'processing'"
                  [class.bg-purple-100]="order.status === 'shipped'"
                  [class.text-purple-800]="order.status === 'shipped'"
                  [class.bg-green-100]="order.status === 'delivered'"
                  [class.text-green-800]="order.status === 'delivered'"
                  [class.bg-red-100]="order.status === 'cancelled'"
                  [class.text-red-800]="order.status === 'cancelled'">
                  {{ 'orders.status.' + order.status | translate }}
                </span>
              </div>
            </div>

            <!-- Order Details -->
            <div class="p-6 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p class="text-sm text-gray-600 mb-1">{{ 'orders.totalAmount' | translate }}</p>
                  <p class="text-2xl font-bold text-gray-900">€{{ order.total.toFixed(2) }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600 mb-1">{{ 'orders.items' | translate }}</p>
                  <p class="text-2xl font-bold text-gray-900">{{ order.items.length }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600 mb-1">{{ 'orders.estimatedDelivery' | translate }}</p>
                  <p class="text-2xl font-bold text-gray-900">
                    {{ order.estimatedDelivery | date: 'dd MMM' }}
                  </p>
                </div>
              </div>

              <!-- Order Items -->
              <div class="border-t pt-4">
                <h4 class="font-semibold text-gray-900 mb-3">{{ 'orders.items' | translate }}</h4>
                <div class="space-y-2">
                  <div *ngFor="let item of order.items" class="flex justify-between text-sm">
                    <div>
                      <p class="font-medium text-gray-900">{{ item.name }}</p>
                      <p class="text-gray-600">{{ item.quantity }} x €{{ item.price.toFixed(2) }}</p>
                    </div>
                    <p class="font-semibold text-gray-900">€{{ (item.quantity * item.price).toFixed(2) }}</p>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="border-t pt-4 flex gap-3">
                <button routerLink="['/orders', order.id]"
                  class="flex-1 px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition font-semibold">
                  {{ 'orders.viewDetails' | translate }}
                </button>
                <button *ngIf="order.status === 'delivered'"
                  class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">
                  {{ 'orders.reorder' | translate }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class OrdersComponent implements OnInit {
  orders$!: Observable<any[]>;

  constructor(
    private store: Store<any>,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orders$ = this.store.select(selectUserOrders);
  }

  trackByOrderId(index: number, order: any): string {
    return order.id;
  }
}

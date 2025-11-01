import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CartItem } from './cart.service';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id?: string;
  userId?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod?: string;
  createdAt?: Date;
  updatedAt?: Date;
  trackingNumber?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  public orders$ = this.ordersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadOrders();
  }

  /**
   * Load user orders from API
   */
  loadOrders(userId?: string): void {
    let params = new HttpParams();
    if (userId) {
      params = params.set('userId', userId);
    }

    this.http
      .get<Order[]>(this.apiUrl, { params })
      .pipe(
        tap(orders => this.ordersSubject.next(orders))
      )
      .subscribe({
        error: () => this.ordersSubject.next([])
      });
  }

  /**
   * Create new order from cart
   */
  createOrder(cartItems: CartItem[], totals: any, customerInfo: any): Observable<Order> {
    const order: Order = {
      items: cartItems.map(item => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity
      })),
      subtotal: totals.subtotal,
      tax: totals.tax,
      deliveryFee: totals.deliveryFee,
      total: totals.total,
      status: 'pending',
      customerInfo
    };

    return this.http.post<Order>(this.apiUrl, order).pipe(
      tap(() => this.loadOrders())
    );
  }

  /**
   * Get all orders (Admin)
   */
  getOrders(): Observable<Order[]> {
    return this.orders$;
  }

  /**
   * Get user orders
   */
  getUserOrders(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}?userId=${userId}`);
  }

  /**
   * Get order by ID
   */
  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  /**
   * Update order status (Admin)
   */
  updateOrderStatus(id: string, status: Order['status'], trackingNumber?: string): Observable<Order> {
    const payload: any = { status };
    if (trackingNumber) {
      payload.trackingNumber = trackingNumber;
    }

    return this.http
      .patch<Order>(`${this.apiUrl}/${id}/status`, payload)
      .pipe(
        tap(() => this.loadOrders())
      );
  }

  /**
   * Cancel order
   */
  cancelOrder(id: string): Observable<Order> {
    return this.http
      .patch<Order>(`${this.apiUrl}/${id}/cancel`, {})
      .pipe(
        tap(() => this.loadOrders())
      );
  }

  /**
   * Get order statistics (Admin)
   */
  getOrderStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }

  /**
   * Get orders by status (Admin)
   */
  getOrdersByStatus(status: Order['status']): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}?status=${status}`);
  }

  /**
   * Get current stored orders
   */
  getOrdersSync(): Order[] {
    return this.ordersSubject.value;
  }
}

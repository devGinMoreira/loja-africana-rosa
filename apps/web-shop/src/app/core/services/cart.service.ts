import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.service';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartTotals {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'cart';
  private readonly TAX_RATE = 0.13; // 13% IVA
  private readonly FREE_DELIVERY_THRESHOLD = 50;
  private readonly DELIVERY_FEE = 2.00;

  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  public cart$ = this.cartSubject.asObservable();

  public cartTotal$ = this.cart$.pipe(
    map(items => this.calculateTotals(items))
  );

  public cartItemCount$ = this.cart$.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );

  constructor() {
    // Persist cart to localStorage whenever it changes
    this.cart$.subscribe(items => this.saveToStorage(items));
  }

  /**
   * Add product to cart
   */
  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const cartItem: CartItem = {
        ...product,
        quantity
      };
      currentCart.push(cartItem);
    }

    this.cartSubject.next([...currentCart]);
  }

  /**
   * Remove product from cart
   */
  removeFromCart(productId: string): void {
    const currentCart = this.cartSubject.value;
    const filtered = currentCart.filter(item => item.id !== productId);
    this.cartSubject.next(filtered);
  }

  /**
   * Update item quantity
   */
  updateQuantity(productId: string, quantity: number): void {
    const currentCart = this.cartSubject.value;
    const item = currentCart.find(i => i.id === productId);

    if (item) {
      item.quantity = Math.max(1, quantity);
      this.cartSubject.next([...currentCart]);
    }
  }

  /**
   * Clear entire cart
   */
  clearCart(): void {
    this.cartSubject.next([]);
  }

  /**
   * Get current cart items
   */
  getCartItems(): CartItem[] {
    return this.cartSubject.value;
  }

  /**
   * Get cart as observable
   */
  getCart(): Observable<CartItem[]> {
    return this.cart$;
  }

  /**
   * Get cart totals
   */
  getCartTotals(): CartTotals {
    return this.calculateTotals(this.cartSubject.value);
  }

  /**
   * Get cart totals as observable
   */
  getCartTotals$(): Observable<CartTotals> {
    return this.cartTotal$;
  }

  /**
   * Get item count as observable
   */
  getItemCount$(): Observable<number> {
    return this.cartItemCount$;
  }

  /**
   * Check if product is in cart
   */
  isInCart(productId: string): boolean {
    return this.cartSubject.value.some(item => item.id === productId);
  }

  /**
   * Get item quantity from cart
   */
  getItemQuantity(productId: string): number {
    const item = this.cartSubject.value.find(i => i.id === productId);
    return item?.quantity || 0;
  }

  /**
   * Calculate subtotal, tax, delivery fee and total
   */
  private calculateTotals(items: CartItem[]): CartTotals {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * this.TAX_RATE;
    const deliveryFee = subtotal >= this.FREE_DELIVERY_THRESHOLD ? 0 : this.DELIVERY_FEE;
    const total = subtotal + tax + deliveryFee;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      deliveryFee: Math.round(deliveryFee * 100) / 100,
      total: Math.round(total * 100) / 100
    };
  }

  /**
   * Load cart from localStorage
   */
  private loadFromStorage(): CartItem[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load cart from storage:', error);
      return [];
    }
  }

  /**
   * Save cart to localStorage
   */
  private saveToStorage(items: CartItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to storage:', error);
    }
  }
}

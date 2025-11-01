import { createReducer, on } from '@ngrx/store';
import { CartState, initialCartState } from './cart.state';
import * as CartActions from './cart.actions';
import { IvaService } from '../../core/services/iva.service';

// Initialize IVA service (will be injected in effects if needed for more complex scenarios)
const ivaService = new IvaService();

const calculateCartTotals = (items: any[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Calculate tax using product-level IVA rates via IVA service
  // Each item can have its own IVA rate (6%, 13%, or 23%)
  const tax = ivaService.calculateTotalTax(items.map(item => ({
    price: item.price,
    quantity: item.quantity,
    ivaRate: item.ivaRate,
    categoryId: item.categoryId
  })));

  const deliveryFee = subtotal >= 50 ? 0 : 2.00; // Free delivery for orders >= €50, €2.00 fixed otherwise
  const total = subtotal + tax + deliveryFee;

  return { subtotal, tax, deliveryFee, total };
};

export const cartReducer = createReducer(
  initialCartState,

  // Add to Cart
  on(CartActions.addToCart, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(CartActions.addToCartSuccess, (state, { item }) => {
    const existingItem = state.items.find(i => i.productId === item.productId);
    let updatedItems;
    
    if (existingItem) {
      updatedItems = state.items.map(i =>
        i.productId === item.productId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    } else {
      updatedItems = [...state.items, item];
    }

    const totals = calculateCartTotals(updatedItems);
    return {
      ...state,
      items: updatedItems,
      totals: { ...state.totals, ...totals },
      isLoading: false,
      error: null
    };
  }),
  on(CartActions.addToCartFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Remove from Cart
  on(CartActions.removeFromCart, (state) => ({
    ...state,
    isLoading: true
  })),
  on(CartActions.removeFromCartSuccess, (state, { productId }) => {
    const updatedItems = state.items.filter(i => i.productId !== productId);
    const totals = calculateCartTotals(updatedItems);
    return {
      ...state,
      items: updatedItems,
      totals: { ...state.totals, ...totals },
      isLoading: false
    };
  }),

  // Update Cart Item
  on(CartActions.updateCartItem, (state) => ({
    ...state,
    isLoading: true
  })),
  on(CartActions.updateCartItemSuccess, (state, { productId, quantity }) => {
    const updatedItems = quantity > 0
      ? state.items.map(i =>
          i.productId === productId ? { ...i, quantity } : i
        )
      : state.items.filter(i => i.productId !== productId);
    
    const totals = calculateCartTotals(updatedItems);
    return {
      ...state,
      items: updatedItems,
      totals: { ...state.totals, ...totals },
      isLoading: false
    };
  }),

  // Clear Cart
  on(CartActions.clearCart, (state) => ({
    ...state,
    isLoading: true
  })),
  on(CartActions.clearCartSuccess, (state) => ({
    ...state,
    items: [],
    totals: {
      subtotal: 0,
      tax: 0,
      deliveryFee: 2.00,
      discount: 0,
      total: 0
    },
    promoCode: null,
    isLoading: false
  })),

  // Load Cart
  on(CartActions.loadCart, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(CartActions.loadCartSuccess, (state, { items }) => {
    const totals = calculateCartTotals(items);
    return {
      ...state,
      items,
      totals: { ...state.totals, ...totals },
      isLoading: false,
      error: null
    };
  }),
  on(CartActions.loadCartFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Apply Promo Code
  on(CartActions.applyPromoCode, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(CartActions.applyPromoCodeSuccess, (state, { code, discount }) => ({
    ...state,
    promoCode: code,
    totals: {
      ...state.totals,
      discount,
      total: state.totals.subtotal + state.totals.tax + state.totals.deliveryFee - discount
    },
    isLoading: false,
    error: null
  })),
  on(CartActions.applyPromoCodeFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Remove Promo Code
  on(CartActions.removePromoCode, (state) => ({
    ...state,
    isLoading: true
  })),
  on(CartActions.removePromoCodeSuccess, (state) => {
    const totals = calculateCartTotals(state.items);
    return {
      ...state,
      promoCode: null,
      totals: { ...totals, discount: 0 },
      isLoading: false
    };
  })
);

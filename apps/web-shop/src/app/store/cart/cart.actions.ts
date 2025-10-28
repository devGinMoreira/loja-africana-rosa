import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.state';

export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ item: CartItem }>()
);

export const addToCartSuccess = createAction(
  '[Cart] Add to Cart Success',
  props<{ item: CartItem }>()
);

export const addToCartFailure = createAction(
  '[Cart] Add to Cart Failure',
  props<{ error: string }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ productId: string }>()
);

export const removeFromCartSuccess = createAction(
  '[Cart] Remove from Cart Success',
  props<{ productId: string }>()
);

export const updateCartItem = createAction(
  '[Cart] Update Cart Item',
  props<{ productId: string; quantity: number }>()
);

export const updateCartItemSuccess = createAction(
  '[Cart] Update Cart Item Success',
  props<{ productId: string; quantity: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

export const clearCartSuccess = createAction('[Cart] Clear Cart Success');

export const loadCart = createAction('[Cart] Load Cart');

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ items: CartItem[] }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: string }>()
);

export const applyPromoCode = createAction(
  '[Cart] Apply Promo Code',
  props<{ code: string }>()
);

export const applyPromoCodeSuccess = createAction(
  '[Cart] Apply Promo Code Success',
  props<{ code: string; discount: number }>()
);

export const applyPromoCodeFailure = createAction(
  '[Cart] Apply Promo Code Failure',
  props<{ error: string }>()
);

export const removePromoCode = createAction(
  '[Cart] Remove Promo Code'
);

export const removePromoCodeSuccess = createAction(
  '[Cart] Remove Promo Code Success'
);

export const calculateTotals = createAction('[Cart] Calculate Totals');

export const calculateTotalsSuccess = createAction(
  '[Cart] Calculate Totals Success',
  props<{ subtotal: number; tax: number; deliveryFee: number; discount: number; total: number }>()
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectCartTotals = createSelector(
  selectCartState,
  (state: CartState) => state.totals
);

export const selectCartItemCount = createSelector(
  selectCartItems,
  (items) => items.length
);

export const selectCartItemsCount = createSelector(
  selectCartItems,
  (items) => items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
  selectCartTotals,
  (totals) => totals.subtotal
);

export const selectCartTotal = createSelector(
  selectCartTotals,
  (totals) => totals.total
);

export const selectCartDeliveryFee = createSelector(
  selectCartTotals,
  (totals) => totals.deliveryFee
);

export const selectCartTax = createSelector(
  selectCartTotals,
  (totals) => totals.tax
);

export const selectCartDiscount = createSelector(
  selectCartTotals,
  (totals) => totals.discount
);

export const selectCartPromoCode = createSelector(
  selectCartState,
  (state: CartState) => state.promoCode
);

export const selectCartLoading = createSelector(
  selectCartState,
  (state: CartState) => state.isLoading
);

export const selectCartError = createSelector(
  selectCartState,
  (state: CartState) => state.error
);

export const selectCartEmpty = createSelector(
  selectCartItems,
  (items) => items.length === 0
);

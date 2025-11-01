import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';
import { selectAllProducts } from '../products/products.selectors';

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

// Alias selectors for cart page
export const selectItemCount = selectCartItemCount;
export const selectSubtotal = selectCartSubtotal;
export const selectTax = selectCartTax;
export const selectDeliveryFee = selectCartDeliveryFee;
export const selectDiscount = selectCartDiscount;
export const selectTotal = selectCartTotal;
export const selectAppliedPromoCode = selectCartPromoCode;
export const selectPromoError = createSelector(
  selectCartState,
  (state: CartState) => state.error
);
export const selectIsLoading = selectCartLoading;

// Cart items with product details
export const selectCartItemsWithDetails = createSelector(
  selectCartItems,
  selectAllProducts,
  (cartItems, products) => {
    return cartItems.map(cartItem => {
      const product = products.find(p => p.id === cartItem.productId);
      return {
        ...cartItem,
        productDetails: product
      };
    });
  }
);

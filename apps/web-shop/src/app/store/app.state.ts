import { authReducer } from './auth/auth.reducer';
import { cartReducer } from './cart/cart.reducer';
import { productsReducer } from './products/products.reducer';
import { checkoutReducer } from './checkout/checkout.reducer';
import { ordersReducer } from './orders/orders.reducer';

import { AuthEffects } from './auth/auth.effects';
import { ProductsEffects } from './products/products.effects';
import { CheckoutEffects } from './checkout/checkout.effects';

/**
 * Root state object aggregating all feature states
 */
export const appState = {
  auth: authReducer,
  cart: cartReducer,
  products: productsReducer,
  checkout: checkoutReducer,
  orders: ordersReducer
};

/**
 * Array of all effects to be provided to the store
 */
export const appEffects = [
  AuthEffects,
  ProductsEffects,
  CheckoutEffects
];

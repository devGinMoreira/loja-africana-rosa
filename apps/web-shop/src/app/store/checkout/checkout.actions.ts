import { createAction, props } from '@ngrx/store';
import { Address, DeliveryMethod, PaymentMethod, Order } from './checkout.state';

// Step Navigation
export const setCurrentStep = createAction(
  '[Checkout] Set Current Step',
  props<{ step: number }>()
);

export const nextStep = createAction(
  '[Checkout] Next Step'
);

export const previousStep = createAction(
  '[Checkout] Previous Step'
);

// Address Management
export const loadAddresses = createAction(
  '[Checkout] Load Addresses'
);

export const loadAddressesSuccess = createAction(
  '[Checkout] Load Addresses Success',
  props<{ addresses: Address[] }>()
);

export const loadAddressesFailure = createAction(
  '[Checkout] Load Addresses Failure',
  props<{ error: string }>()
);

export const addAddress = createAction(
  '[Checkout] Add Address',
  props<{ address: Omit<Address, 'id' | 'createdAt'> }>()
);

export const addAddressSuccess = createAction(
  '[Checkout] Add Address Success',
  props<{ address: Address }>()
);

export const addAddressFailure = createAction(
  '[Checkout] Add Address Failure',
  props<{ error: string }>()
);

export const selectAddress = createAction(
  '[Checkout] Select Address',
  props<{ addressId: string }>()
);

export const removeAddress = createAction(
  '[Checkout] Remove Address',
  props<{ addressId: string }>()
);

export const setDefaultAddress = createAction(
  '[Checkout] Set Default Address',
  props<{ addressId: string }>()
);

// Delivery Method Selection
export const selectDeliveryMethod = createAction(
  '[Checkout] Select Delivery Method',
  props<{ deliveryMethodId: string }>()
);

// Payment Method Selection
export const selectPaymentMethod = createAction(
  '[Checkout] Select Payment Method',
  props<{ paymentMethodId: string }>()
);

// Order Creation
export const createOrder = createAction(
  '[Checkout] Create Order'
);

export const createOrderSuccess = createAction(
  '[Checkout] Create Order Success',
  props<{ order: Order }>()
);

export const createOrderFailure = createAction(
  '[Checkout] Create Order Failure',
  props<{ error: string }>()
);

// Order Confirmation
export const confirmOrder = createAction(
  '[Checkout] Confirm Order',
  props<{ orderId: string }>()
);

export const confirmOrderSuccess = createAction(
  '[Checkout] Confirm Order Success',
  props<{ order: Order }>()
);

export const confirmOrderFailure = createAction(
  '[Checkout] Confirm Order Failure',
  props<{ error: string }>()
);

// Clear Checkout State
export const clearCheckout = createAction(
  '[Checkout] Clear Checkout'
);

// Error Handling
export const clearError = createAction(
  '[Checkout] Clear Error'
);

export const clearSuccess = createAction(
  '[Checkout] Clear Success'
);

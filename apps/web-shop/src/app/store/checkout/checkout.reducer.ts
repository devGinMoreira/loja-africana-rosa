import { createReducer, on } from '@ngrx/store';
import { CheckoutState, initialCheckoutState } from './checkout.state';
import * as CheckoutActions from './checkout.actions';

export const checkoutReducer = createReducer(
  initialCheckoutState,

  // Step Navigation
  on(CheckoutActions.setCurrentStep, (state, { step }) => ({
    ...state,
    currentStep: step,
    error: null
  })),

  on(CheckoutActions.nextStep, (state) => ({
    ...state,
    currentStep: Math.min(state.currentStep + 1, 4),
    error: null
  })),

  on(CheckoutActions.previousStep, (state) => ({
    ...state,
    currentStep: Math.max(state.currentStep - 1, 1),
    error: null
  })),

  // Load Addresses
  on(CheckoutActions.loadAddresses, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(CheckoutActions.loadAddressesSuccess, (state, { addresses }) => ({
    ...state,
    addresses,
    isLoading: false,
    selectedAddressId: addresses.find(a => a.isDefault)?.id || addresses[0]?.id || null
  })),

  on(CheckoutActions.loadAddressesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Add Address
  on(CheckoutActions.addAddress, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(CheckoutActions.addAddressSuccess, (state, { address }) => ({
    ...state,
    addresses: [...state.addresses, address],
    selectedAddressId: address.id,
    isLoading: false
  })),

  on(CheckoutActions.addAddressFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Select Address
  on(CheckoutActions.selectAddress, (state, { addressId }) => ({
    ...state,
    selectedAddressId: addressId,
    error: null
  })),

  // Remove Address
  on(CheckoutActions.removeAddress, (state, { addressId }) => ({
    ...state,
    addresses: state.addresses.filter(a => a.id !== addressId),
    selectedAddressId: state.selectedAddressId === addressId 
      ? state.addresses[0]?.id || null 
      : state.selectedAddressId
  })),

  // Set Default Address
  on(CheckoutActions.setDefaultAddress, (state, { addressId }) => ({
    ...state,
    addresses: state.addresses.map(a => ({
      ...a,
      isDefault: a.id === addressId
    })),
    selectedAddressId: addressId
  })),

  // Select Delivery Method
  on(CheckoutActions.selectDeliveryMethod, (state, { deliveryMethodId }) => ({
    ...state,
    selectedDeliveryMethodId: deliveryMethodId,
    error: null
  })),

  // Select Payment Method
  on(CheckoutActions.selectPaymentMethod, (state, { paymentMethodId }) => ({
    ...state,
    selectedPaymentMethodId: paymentMethodId,
    error: null
  })),

  // Create Order
  on(CheckoutActions.createOrder, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(CheckoutActions.createOrderSuccess, (state, { order }) => ({
    ...state,
    order,
    isLoading: false,
    currentStep: 4
  })),

  on(CheckoutActions.createOrderFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Confirm Order
  on(CheckoutActions.confirmOrder, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(CheckoutActions.confirmOrderSuccess, (state, { order }) => ({
    ...state,
    order,
    isLoading: false,
    successMessage: 'Pedido confirmado com sucesso!'
  })),

  on(CheckoutActions.confirmOrderFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Clear Checkout
  on(CheckoutActions.clearCheckout, () => initialCheckoutState),

  // Clear Error
  on(CheckoutActions.clearError, (state) => ({
    ...state,
    error: null
  })),

  // Clear Success
  on(CheckoutActions.clearSuccess, (state) => ({
    ...state,
    successMessage: null
  }))
);

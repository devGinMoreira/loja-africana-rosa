import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CheckoutState } from './checkout.state';

export const selectCheckoutState = createFeatureSelector<CheckoutState>('checkout');

// Current Step
export const selectCurrentStep = createSelector(
  selectCheckoutState,
  (state: CheckoutState) => state.currentStep
);

export const selectIsStep1 = createSelector(
  selectCurrentStep,
  (step) => step === 1
);

export const selectIsStep2 = createSelector(
  selectCurrentStep,
  (step) => step === 2
);

export const selectIsStep3 = createSelector(
  selectCurrentStep,
  (step) => step === 3
);

export const selectIsStep4 = createSelector(
  selectCurrentStep,
  (step) => step === 4
);

// Addresses
export const selectAllAddresses = createSelector(
  selectCheckoutState,
  (state: CheckoutState) => state.addresses
);

export const selectSelectedAddressId = createSelector(
  selectCheckoutState,
  (state: CheckoutState) => state.selectedAddressId
);

export const selectSelectedAddress = createSelector(
  selectAllAddresses,
  selectSelectedAddressId,
  (addresses, selectedId) => addresses.find(a => a.id === selectedId) || null
);

export const selectDefaultAddress = createSelector(
  selectAllAddresses,
  (addresses) => addresses.find(a => a.isDefault) || null
);

export const selectAddressCount = createSelector(
  selectAllAddresses,
  (addresses) => addresses.length
);

// Delivery Methods
export const selectAllDeliveryMethods = createSelector(
  selectCheckoutState,
  (state: CheckoutState) => state.deliveryMethods
);

export const selectSelectedDeliveryMethodId = createSelector(
  selectCheckoutState,
  (state: CheckoutState) => state.selectedDeliveryMethodId
);

export const selectSelectedDeliveryMethod = createSelector(
  selectAllDeliveryMethods,
  selectSelectedDeliveryMethodId,
  (methods, selectedId) => methods.find(m => m.id === selectedId) || null
);

export const selectDeliveryMethodCost = createSelector(
  selectSelectedDeliveryMethod,
  (method) => method?.cost || 0
);

// Payment Methods
export const selectAllPaymentMethods = createSelector(
  selectCheckoutState,
  (state: CheckoutState) => state.paymentMethods
);

export const selectSelectedPaymentMethodId = createSelector(
  selectCheckoutState,
  (state: CheckoutState) => state.selectedPaymentMethodId
);

export const selectSelectedPaymentMethod = createSelector(
  selectAllPaymentMethods,
  selectSelectedPaymentMethodId,
  (methods, selectedId) => methods.find(m => m.id === selectedId) || null
);

// Order
export const selectOrder = createSelector(
  selectCheckoutState,
  (state: CheckoutState) => state.order
);

export const selectOrderNumber = createSelector(
  selectOrder,
  (order) => order?.orderNumber || null
);

export const selectOrderTotal = createSelector(
  selectOrder,
  (order) => order?.total || 0
);

export const selectOrderEstimatedDelivery = createSelector(
  selectOrder,
  (order) => order?.estimatedDelivery || null
);

// Loading and Error States
export const selectIsLoading = createSelector(
  selectCheckoutState,
  (state: CheckoutState) => state.isLoading
);

export const selectError = createSelector(
  selectCheckoutState,
  (state: CheckoutState) => state.error
);

export const selectSuccessMessage = createSelector(
  selectCheckoutState,
  (state: CheckoutState) => state.successMessage
);

// Checkout Validation
export const selectCanProceedToStep2 = createSelector(
  selectSelectedAddress,
  (address) => !!address
);

export const selectCanProceedToStep3 = createSelector(
  selectSelectedDeliveryMethod,
  (method) => !!method
);

export const selectCanProceedToStep4 = createSelector(
  selectSelectedPaymentMethod,
  (method) => !!method
);

export const selectCheckoutSummary = createSelector(
  selectSelectedAddress,
  selectSelectedDeliveryMethod,
  selectSelectedPaymentMethod,
  selectOrder,
  (address, deliveryMethod, paymentMethod, order) => ({
    address,
    deliveryMethod,
    paymentMethod,
    order
  })
);

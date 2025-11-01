// Checkout State Management
export interface Address {
  id: string;
  name: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
}

export interface DeliveryMethod {
  id: string;
  name: string;
  description: string;
  estimatedDays: string;
  cost: number;
  icon: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: any[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
  address: Address;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  promoCode?: string;
  createdAt: Date;
  estimatedDelivery: Date;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
}

export interface CheckoutState {
  currentStep: number; // 1-4
  addresses: Address[];
  selectedAddressId: string | null;
  deliveryMethods: DeliveryMethod[];
  selectedDeliveryMethodId: string | null;
  paymentMethods: PaymentMethod[];
  selectedPaymentMethodId: string | null;
  order: Order | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

export const initialCheckoutState: CheckoutState = {
  currentStep: 1,
  addresses: [],
  selectedAddressId: null,
  deliveryMethods: [
    {
      id: 'standard',
      name: 'Entrega Standard',
      description: '3-5 dias úteis',
      estimatedDays: '3-5 dias',
      cost: 2.00,
      icon: 'truck'
    },
    {
      id: 'express',
      name: 'Entrega Expressa',
      description: '1-2 dias úteis',
      estimatedDays: '1-2 dias',
      cost: 5.99,
      icon: 'zap'
    },
    {
      id: 'pickup',
      name: 'Levantamento em Loja',
      description: 'Grátis',
      estimatedDays: '2-3 dias',
      cost: 0,
      icon: 'home'
    }
  ],
  selectedDeliveryMethodId: null,
  paymentMethods: [
    {
      id: 'card',
      name: 'Cartão de Crédito',
      description: 'Visa, Mastercard, Amex',
      icon: 'credit-card'
    },
    {
      id: 'bank',
      name: 'Transferência Bancária',
      description: 'Transferência direta',
      icon: 'bank'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pagamento seguro via PayPal',
      icon: 'paypal'
    }
  ],
  selectedPaymentMethodId: null,
  order: null,
  isLoading: false,
  error: null,
  successMessage: null
};

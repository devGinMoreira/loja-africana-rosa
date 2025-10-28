import { CartItem } from '../cart/cart.state';

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount?: number;
  total: number;
  status: 'pendente' | 'confirmado' | 'processando' | 'enviado' | 'entregue' | 'cancelado' | 'devolvido';
  deliveryAddress: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  deliveryMethod?: 'standard' | 'express' | 'pickup';
  paymentMethod?: 'creditCard' | 'bankTransfer';
  paymentStatus?: 'pending' | 'completed' | 'failed' | 'refunded';
  deliveryDate?: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersFilter {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface OrdersResponse {
  data: Order[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface OrdersState {
  orders: Order[];
  selectedOrder: Order | null;
  filters: OrdersFilter;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  isLoading: boolean;
  isCreating: boolean;
  error: string | null;
}

export const initialOrdersState: OrdersState = {
  orders: [],
  selectedOrder: null,
  filters: { page: 1, limit: 20 },
  pagination: { page: 1, limit: 20, total: 0 },
  isLoading: false,
  isCreating: false,
  error: null
};

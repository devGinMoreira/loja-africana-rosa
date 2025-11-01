/**
 * OrderDTO - Order Data Transfer Object
 *
 * Represents a customer order with line items and delivery information.
 */

export interface OrderItemDTO {
  id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  subtotal: number;
}

export interface OrderDTO {
  id: string;
  user_id: string;
  items: OrderItemDTO[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  delivery_address: {
    street: string;
    postal_code: string;
    city: string;
    country: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CreateOrderDTO {
  items: {
    product_id: string;
    quantity: number;
  }[];
  delivery_address: {
    street: string;
    postal_code: string;
    city: string;
    country: string;
  };
}

export interface CartItem {
  id?: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartTotals {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export interface CartState {
  items: CartItem[];
  totals: CartTotals;
  promoCode: string | null;
  isLoading: boolean;
  error: string | null;
}

export const initialCartState: CartState = {
  items: [],
  totals: {
    subtotal: 0,
    tax: 0,
    deliveryFee: 3.50,
    discount: 0,
    total: 0
  },
  promoCode: null,
  isLoading: false,
  error: null
};

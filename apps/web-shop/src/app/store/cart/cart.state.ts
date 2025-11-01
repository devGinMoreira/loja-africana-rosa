export interface CartItem {
  id?: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  ivaRate?: number; // IVA rate (6, 13, or 23) - inherited from product or category default
  categoryId?: string; // Category ID for IVA rate lookup if ivaRate not specified
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
    deliveryFee: 2.00, // €2.00 fixed fee (free for orders >= €50)
    discount: 0,
    total: 0
  },
  promoCode: null,
  isLoading: false,
  error: null
};

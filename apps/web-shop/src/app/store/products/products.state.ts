export interface Product {
  id: string;
  name: string;
  slug?: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image?: string;
  images?: string[];
  stock: number;
  sku?: string;
  rating?: number;
  reviewCount?: number;
  isFeatured?: boolean;
  isTopSeller?: boolean;
  promoPercentage?: number;
}

export interface ProductFilter {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  searchTerm?: string;
  inStock?: boolean;
  onPromotion?: boolean;
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'popularity' | 'rating';
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  filters: ProductFilter;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  isLoading: boolean;
  error: string | null;
}

export const initialProductsState: ProductsState = {
  products: [],
  selectedProduct: null,
  filters: { page: 1, limit: 20 },
  pagination: { page: 1, limit: 20, total: 0 },
  isLoading: false,
  error: null
};

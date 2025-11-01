export interface Product {
  id: string;
  name: string;
  slug?: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  category?: string;
  image?: string;
  images?: string[];
  stock: number;
  inStock?: boolean;
  sku?: string;
  rating?: number;
  reviews?: number;
  isFeatured?: boolean;
  isTopSeller?: boolean;
  isPromotion?: boolean;
  discount?: number;
  specifications?: Array<{ name: string; value: string }>;
  ivaRate?: number; // IVA rate as percentage (6, 13, or 23). Defaults to 13%
}

export interface ProductFilters {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  ratings: number[];
  onPromotion: boolean;
  searchQuery: string;
}

export interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  relatedProducts: Product[];
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  filters: ProductFilters;
  sortBy: string;
}

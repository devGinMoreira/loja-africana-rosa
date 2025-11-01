import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './products.actions';
import { ProductsState } from './products.state';

export const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  relatedProducts: [],
  isLoading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 12,
  hasMore: false,
  filters: {
    categories: [],
    minPrice: 0,
    maxPrice: 500,
    inStockOnly: false,
    ratings: [],
    onPromotion: false,
    searchQuery: ''
  },
  sortBy: 'relevance'
};

export const productsReducer = createReducer(
  initialState,
  // Load Products
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(ProductActions.loadProductsSuccess, (state, { products, total, page, limit }) => ({
    ...state,
    products,
    total,
    page,
    limit,
    hasMore: page * limit < total,
    isLoading: false
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  })),

  // Load Product Detail
  on(ProductActions.loadProductDetail, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(ProductActions.loadProductDetailSuccess, (state, { product }) => ({
    ...state,
    selectedProduct: product,
    isLoading: false
  })),
  on(ProductActions.loadProductDetailFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  })),

  // Load Related Products
  on(ProductActions.loadRelatedProducts, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(ProductActions.loadRelatedProductsSuccess, (state, { products }) => ({
    ...state,
    relatedProducts: products,
    isLoading: false
  })),
  on(ProductActions.loadRelatedProductsFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  })),

  // Clear Selected Product
  on(ProductActions.clearSelectedProduct, (state) => ({
    ...state,
    selectedProduct: null
  })),

  // Set Selected Product
  on(ProductActions.setSelectedProduct, (state, { product }) => ({
    ...state,
    selectedProduct: product
  }))
);

import { createAction, props } from '@ngrx/store';

export interface ProductFilters {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  ratings: number[];
  onPromotion: boolean;
  searchQuery: string;
}

export const loadProducts = createAction(
  '[Products] Load Products',
  props<{
    filters: ProductFilters;
    sortBy: string;
    page: number;
    limit: number;
  }>()
);

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{
    products: any[];
    total: number;
    page: number;
    limit: number;
  }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>()
);

export const loadProductDetail = createAction(
  '[Products] Load Product Detail',
  props<{ productId: string }>()
);

export const loadProductDetailSuccess = createAction(
  '[Products] Load Product Detail Success',
  props<{ product: any }>()
);

export const loadProductDetailFailure = createAction(
  '[Products] Load Product Detail Failure',
  props<{ error: string }>()
);

export const loadRelatedProducts = createAction(
  '[Products] Load Related Products',
  props<{ productId: string; categoryId: string }>()
);

export const loadRelatedProductsSuccess = createAction(
  '[Products] Load Related Products Success',
  props<{ products: any[] }>()
);

export const loadRelatedProductsFailure = createAction(
  '[Products] Load Related Products Failure',
  props<{ error: string }>()
);

export const clearSelectedProduct = createAction(
  '[Products] Clear Selected Product'
);

export const setSelectedProduct = createAction(
  '[Products] Set Selected Product',
  props<{ product: any }>()
);

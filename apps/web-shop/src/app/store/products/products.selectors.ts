import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.state';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state) => state.products
);

export const selectSelectedProduct = createSelector(
  selectProductsState,
  (state) => state.selectedProduct
);

export const selectRelatedProducts = createSelector(
  selectProductsState,
  (state) => state.relatedProducts
);

export const selectIsLoading = createSelector(
  selectProductsState,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectProductsState,
  (state) => state.error
);

export const selectTotal = createSelector(
  selectProductsState,
  (state) => state.total
);

export const selectPage = createSelector(
  selectProductsState,
  (state) => state.page
);

export const selectLimit = createSelector(
  selectProductsState,
  (state) => state.limit
);

export const selectHasMore = createSelector(
  selectProductsState,
  (state) => state.hasMore
);

export const selectFilters = createSelector(
  selectProductsState,
  (state) => state.filters
);

export const selectSortBy = createSelector(
  selectProductsState,
  (state) => state.sortBy
);

export const selectProductById = (productId: string) =>
  createSelector(selectAllProducts, (products) =>
    products.find((p) => p.id === productId)
  );

export const selectProductsByCategory = (categoryId: string) =>
  createSelector(selectAllProducts, (products) =>
    products.filter((p) => p.categoryId === categoryId)
  );

export const selectFeaturedProducts = createSelector(
  selectAllProducts,
  (products) => products.filter((p) => p.isFeatured)
);

export const selectTopSellerProducts = createSelector(
  selectAllProducts,
  (products) => products.filter((p) => p.isTopSeller)
);

export const selectPromotionProducts = createSelector(
  selectAllProducts,
  (products) => products.filter((p) => p.isPromotion)
);

export const selectInStockProducts = createSelector(
  selectAllProducts,
  (products) => products.filter((p) => p.inStock)
);

export const selectTopBestSellers = createSelector(
  selectAllProducts,
  (products) =>
    products
      .filter((p) => p.inStock)
      .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
      .slice(0, 10)
);

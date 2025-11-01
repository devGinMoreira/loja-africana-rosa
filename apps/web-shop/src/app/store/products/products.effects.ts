import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as ProductActions from './products.actions';
import { ApiService } from '../../core/http/api.service';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(({ filters, sortBy, page, limit }) =>
        this.apiService
          .get<any>('/products', {
            categories: filters.categories.join(','),
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            inStockOnly: filters.inStockOnly,
            ratings: filters.ratings.join(','),
            onPromotion: filters.onPromotion,
            searchQuery: filters.searchQuery,
            sortBy,
            page,
            limit
          })
          .pipe(
            map((response) =>
              ProductActions.loadProductsSuccess({
                products: response.data,
                total: response.meta.total,
                page: response.meta.page,
                limit: response.meta.limit
              })
            ),
            catchError((error) =>
              of(
                ProductActions.loadProductsFailure({
                  error: error.error?.message || 'Failed to load products'
                })
              )
            )
          )
      )
    )
  );

  loadProductDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductDetail),
      switchMap(({ productId }) =>
        this.apiService.get<any>(`/products/${productId}`).pipe(
          map((response) =>
            ProductActions.loadProductDetailSuccess({
              product: response
            })
          ),
          catchError((error) =>
            of(
              ProductActions.loadProductDetailFailure({
                error: error.error?.message || 'Failed to load product'
              })
            )
          )
        )
      )
    )
  );

  loadRelatedProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadRelatedProducts),
      switchMap(({ productId, categoryId }) =>
        this.apiService
          .get<any>('/products', {
            categoryId,
            excludeProductId: productId,
            limit: 4
          })
          .pipe(
            map((response) =>
              ProductActions.loadRelatedProductsSuccess({
                products: response.data
              })
            ),
            catchError((error) =>
              of(
                ProductActions.loadRelatedProductsFailure({
                  error: error.error?.message || 'Failed to load related products'
                })
              )
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}
}

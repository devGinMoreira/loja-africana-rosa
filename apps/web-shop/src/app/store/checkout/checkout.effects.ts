import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import * as CheckoutActions from './checkout.actions';
import * as CartSelectors from '../cart/cart.selectors';
import * as CheckoutSelectors from './checkout.selectors';
import { Router } from '@angular/router';
import { DeliveryDateService } from '../../core/services/delivery-date.service';

@Injectable()
export class CheckoutEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private router: Router,
    private deliveryDateService: DeliveryDateService
  ) {}

  loadAddresses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.loadAddresses),
      switchMap(() => {
        // For now, return mock addresses
        // In production, this would call an API
        const mockAddresses = [
          {
            id: '1',
            name: 'Casa',
            street: 'Rua Principal',
            number: '123',
            complement: 'Apartamento 4B',
            city: 'Lisboa',
            postalCode: '1000-001',
            country: 'Portugal',
            isDefault: true,
            createdAt: new Date()
          },
          {
            id: '2',
            name: 'Trabalho',
            street: 'Avenida das Descobertas',
            number: '456',
            city: 'Lisboa',
            postalCode: '1400-099',
            country: 'Portugal',
            isDefault: false,
            createdAt: new Date()
          }
        ];

        return of(CheckoutActions.loadAddressesSuccess({ addresses: mockAddresses }));
      }),
      catchError((error) =>
        of(CheckoutActions.loadAddressesFailure({ error: error.message }))
      )
    )
  );

  addAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.addAddress),
      switchMap(({ address }) => {
        // In production, this would call an API
        const newAddress = {
          ...address,
          id: Date.now().toString(),
          createdAt: new Date()
        };

        return of(CheckoutActions.addAddressSuccess({ address: newAddress }));
      }),
      catchError((error) =>
        of(CheckoutActions.addAddressFailure({ error: error.message }))
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.createOrder),
      withLatestFrom(
        this.store.select(CartSelectors.selectCartState),
        this.store.select(CheckoutSelectors.selectCheckoutState)
      ),
      switchMap(([_, cart, checkout]) => {
        const selectedAddress = checkout.addresses.find(
          (a: any) => a.id === checkout.selectedAddressId
        );
        const selectedDeliveryMethod = checkout.deliveryMethods.find(
          (m: any) => m.id === checkout.selectedDeliveryMethodId
        );
        const selectedPaymentMethod = checkout.paymentMethods.find(
          (m: any) => m.id === checkout.selectedPaymentMethodId
        );

        if (!selectedAddress || !selectedDeliveryMethod || !selectedPaymentMethod) {
          return of(
            CheckoutActions.createOrderFailure({
              error: 'Por favor, preencha todos os campos obrigatórios'
            })
          );
        }

        // Generate order with cart data
        // Calculate next delivery date (Wed or Sat only)
        const estimatedDelivery = this.deliveryDateService.getNextDeliveryDate();

        const order = {
          id: Date.now().toString(),
          orderNumber: `ORD-${Date.now()}`,
          items: (cart as any).items || [],
          subtotal: (cart as any).subtotal || 0,
          tax: (cart as any).tax || 0,
          deliveryFee: selectedDeliveryMethod.cost,
          discount: (cart as any).discount || 0,
          total: ((cart as any).subtotal || 0) + ((cart as any).tax || 0) + selectedDeliveryMethod.cost - ((cart as any).discount || 0),
          address: selectedAddress,
          deliveryMethod: selectedDeliveryMethod,
          paymentMethod: selectedPaymentMethod,
          promoCode: (cart as any).promoCode,
          createdAt: new Date(),
          estimatedDelivery: estimatedDelivery,
          status: 'pending' as const
        };

        return of(CheckoutActions.createOrderSuccess({ order }));
      }),
      catchError((error) =>
        of(CheckoutActions.createOrderFailure({ error: error.message }))
      )
    )
  );

  confirmOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.confirmOrder),
      switchMap(({ orderId }) => {
        // In production, this would call an API to process payment
        // and confirm the order
        return of(CheckoutActions.confirmOrderSuccess({ order: {
          id: orderId,
          orderNumber: `ORD-${orderId}`,
          items: [],
          subtotal: 0,
          tax: 0,
          deliveryFee: 0,
          discount: 0,
          total: 0,
          address: null as any,
          deliveryMethod: null as any,
          paymentMethod: null as any,
          createdAt: new Date(),
          estimatedDelivery: new Date(),
          status: 'confirmed' as const
        }}));
      }),
      catchError((error) =>
        of(CheckoutActions.confirmOrderFailure({ error: error.message }))
      )
    )
  );

  // Navigate to confirmation on successful order creation
  orderCreatedNavigation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CheckoutActions.createOrderSuccess),
        tap(() => {
          this.router.navigate(['/checkout'], { queryParams: { step: 4 } });
        })
      ),
    { dispatch: false }
  );

  // Navigate to orders page on successful confirmation
  orderConfirmedNavigation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CheckoutActions.confirmOrderSuccess),
        tap(() => {
          setTimeout(() => {
            this.router.navigate(['/orders']);
          }, 2000);
        })
      ),
    { dispatch: false }
  );
}

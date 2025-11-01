import { createAction, props } from '@ngrx/store';
import { Order, OrdersFilter, OrdersResponse } from './orders.state';

export const loadOrders = createAction(
  '[Orders] Load Orders',
  props<{ filters?: OrdersFilter }>()
);

export const loadOrdersSuccess = createAction(
  '[Orders] Load Orders Success',
  props<{ response: OrdersResponse }>()
);

export const loadOrdersFailure = createAction(
  '[Orders] Load Orders Failure',
  props<{ error: string }>()
);

export const loadOrderById = createAction(
  '[Orders] Load Order By Id',
  props<{ orderId: string }>()
);

export const loadOrderByIdSuccess = createAction(
  '[Orders] Load Order By Id Success',
  props<{ order: Order }>()
);

export const loadOrderByIdFailure = createAction(
  '[Orders] Load Order By Id Failure',
  props<{ error: string }>()
);

export const createOrder = createAction(
  '[Orders] Create Order',
  props<{ orderData: Partial<Order> }>()
);

export const createOrderSuccess = createAction(
  '[Orders] Create Order Success',
  props<{ order: Order }>()
);

export const createOrderFailure = createAction(
  '[Orders] Create Order Failure',
  props<{ error: string }>()
);

export const cancelOrder = createAction(
  '[Orders] Cancel Order',
  props<{ orderId: string }>()
);

export const cancelOrderSuccess = createAction(
  '[Orders] Cancel Order Success',
  props<{ orderId: string }>()
);

export const cancelOrderFailure = createAction(
  '[Orders] Cancel Order Failure',
  props<{ error: string }>()
);

export const updateFilters = createAction(
  '[Orders] Update Filters',
  props<{ filters: OrdersFilter }>()
);

export const clearSelectedOrder = createAction(
  '[Orders] Clear Selected Order'
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from './orders.state';

export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

export const selectAllOrders = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.orders
);

export const selectUserOrders = createSelector(
  selectAllOrders,
  (orders) => orders
);

export const selectSelectedOrder = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.selectedOrder
);

export const selectOrdersLoading = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.isLoading
);

export const selectOrdersCreating = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.isCreating
);

export const selectOrdersError = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.error
);

export const selectOrdersFilters = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.filters
);

export const selectOrdersPagination = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.pagination
);

export const selectOrderById = (orderId: string) =>
  createSelector(selectAllOrders, (orders) =>
    orders.find((order) => order.id === orderId)
  );

export const selectRecentOrders = createSelector(
  selectAllOrders,
  (orders) => orders.slice(0, 5)
);

export const selectPendingOrders = createSelector(
  selectAllOrders,
  (orders) => orders.filter((order) => order.status === 'pendente')
);

export const selectCompletedOrders = createSelector(
  selectAllOrders,
  (orders) => orders.filter((order) => order.status === 'entregue')
);

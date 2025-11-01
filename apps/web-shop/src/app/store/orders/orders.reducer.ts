import { createReducer, on } from '@ngrx/store';
import { OrdersState, initialOrdersState } from './orders.state';

// Placeholder actions - can be extended as needed
export const ordersReducer = createReducer(
  initialOrdersState,
  // Add reducer cases as needed
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectIsAdmin = createSelector(
  selectCurrentUser,
  (user) => user?.role === 'admin'
);

export const selectUserEmail = createSelector(
  selectCurrentUser,
  (user) => user?.email
);

export const selectUserFullName = createSelector(
  selectCurrentUser,
  (user) => user ? `${user.firstName} ${user.lastName}` : ''
);

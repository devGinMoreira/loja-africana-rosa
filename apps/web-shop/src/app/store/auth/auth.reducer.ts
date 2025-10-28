import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  
  // Login
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { response }) => ({
    ...state,
    user: response.user,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Register
  on(AuthActions.register, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthActions.registerSuccess, (state, { response }) => ({
    ...state,
    user: response.user,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Logout
  on(AuthActions.logout, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  })),

  // Refresh Token
  on(AuthActions.refreshToken, (state) => ({
    ...state,
    isLoading: true
  })),
  on(AuthActions.refreshTokenSuccess, (state, { response }) => ({
    ...state,
    user: response.user,
    isLoading: false,
    isAuthenticated: true
  })),
  on(AuthActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
    isAuthenticated: false
  })),

  // Update Profile
  on(AuthActions.updateProfile, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthActions.updateProfileSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoading: false,
    error: null
  })),
  on(AuthActions.updateProfileFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Change Password
  on(AuthActions.changePassword, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthActions.changePasswordSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: null
  })),
  on(AuthActions.changePasswordFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Load Current User
  on(AuthActions.loadCurrentUser, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthActions.loadCurrentUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),
  on(AuthActions.loadCurrentUserFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
);

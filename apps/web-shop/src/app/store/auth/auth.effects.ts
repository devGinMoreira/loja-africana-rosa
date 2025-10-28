import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(response => AuthActions.loginSuccess({ response })),
          catchError(error => {
            const errorMessage = error.error?.message || 'Login failed';
            return of(AuthActions.loginFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.notificationService.success('Login successful');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => {
          this.notificationService.error(error);
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ data }) =>
        this.authService.register(data).pipe(
          map(response => AuthActions.registerSuccess({ response })),
          catchError(error => {
            const errorMessage = error.error?.message || 'Registration failed';
            return of(AuthActions.registerFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          this.notificationService.success('Registration successful');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerFailure),
        tap(({ error }) => {
          this.notificationService.error(error);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(error =>
            of(AuthActions.logoutSuccess()) // Always complete logout
          )
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          this.notificationService.success('Logged out successfully');
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateProfile),
      switchMap(({ data }) =>
        this.authService.updateProfile(data).pipe(
          map(user => AuthActions.updateProfileSuccess({ user })),
          catchError(error => {
            const errorMessage = error.error?.message || 'Profile update failed';
            return of(AuthActions.updateProfileFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  updateProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updateProfileSuccess),
        tap(() => {
          this.notificationService.success('Profile updated successfully');
        })
      ),
    { dispatch: false }
  );

  updateProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updateProfileFailure),
        tap(({ error }) => {
          this.notificationService.error(error);
        })
      ),
    { dispatch: false }
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.changePassword),
      switchMap(({ currentPassword, newPassword }) =>
        this.authService.changePassword(currentPassword, newPassword).pipe(
          map(() => AuthActions.changePasswordSuccess()),
          catchError(error => {
            const errorMessage = error.error?.message || 'Password change failed';
            return of(AuthActions.changePasswordFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  changePasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.changePasswordSuccess),
        tap(() => {
          this.notificationService.success('Password changed successfully');
        })
      ),
    { dispatch: false }
  );

  changePasswordFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.changePasswordFailure),
        tap(({ error }) => {
          this.notificationService.error(error);
        })
      ),
    { dispatch: false }
  );

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadCurrentUser),
      switchMap(() =>
        this.authService.getCurrentUser().pipe(
          map(user => AuthActions.loadCurrentUserSuccess({ user })),
          catchError(error =>
            of(AuthActions.loadCurrentUserFailure({ error: 'Failed to load user' }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
}

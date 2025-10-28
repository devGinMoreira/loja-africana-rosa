import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { authReducer } from './store/auth/auth.reducer';
import { cartReducer } from './store/cart/cart.reducer';
import { AuthEffects } from './store/auth/auth.effects';

import { environment } from '../environments/environment';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AppComponent,
    TranslateModule.forRoot({
      defaultLanguage: environment.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({
      auth: authReducer,
      cart: cartReducer
    }),
    EffectsModule.forRoot([AuthEffects]),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 25,
          logOnly: environment.production
        })
      : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

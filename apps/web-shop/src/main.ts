import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { appState, appEffects } from './app/store/app.state';
import { JwtInterceptor } from './app/core/http/jwt.interceptor';
import { AuthService } from './app/core/auth/auth.service';
import { NotificationService } from './app/core/services/notification.service';
import { ApiService } from './app/core/http/api.service';
import { I18nService } from './app/core/services/i18n.service';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    provideRouter(routes),
    provideStore(appState),
    provideEffects(appEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production
    }),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: environment.defaultLanguage
      })
    ),
    provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json'
    }),
    AuthService,
    NotificationService,
    ApiService,
    I18nService
  ]
}).catch(err => console.error(err));

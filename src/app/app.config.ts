import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import Aura from '@primeuix/themes/aura';
import {provideHttpClient} from '@angular/common/http';
import {provideTranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {ConfirmationService, MessageService} from 'primeng/api';

import localeIT from '@angular/common/locales/it';
import {registerLocaleData} from '@angular/common';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {Dialog} from 'primeng/dialog';

registerLocaleData(localeIT);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: 'none'}  }}),
    provideHttpClient(),
    provideTranslateService({
      lang: 'it',
      fallbackLang: 'it',
      loader: provideTranslateHttpLoader({
        prefix: 'assets/i18n/',
        suffix: '.json'
      })
    }),
    Dialog,
    MessageService,
    ConfirmDialog,
    DialogService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: "it-IT" }
  ]
};


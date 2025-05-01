import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideNgxMask({
      dropSpecialCharacters: false,
      thousandSeparator: '.',
      decimalMarker: ','
    })
  ]
};
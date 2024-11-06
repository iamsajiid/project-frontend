import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
    // provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)
  ]
};

// @NgModule({
//   providers: [
//     { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
//   ]
// })
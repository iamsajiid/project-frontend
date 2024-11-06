import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers:[
    HttpClient,
    provideHttpClient(),
    ...appConfig.providers
  ]
})
  .catch((err) => console.error(err));

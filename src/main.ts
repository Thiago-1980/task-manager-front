import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { TokenInterceptor } from './app/token.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    
    // Habilita interceptors vindos do DI
    provideHttpClient(withInterceptorsFromDi()),

    // Registra nosso TokenInterceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
});

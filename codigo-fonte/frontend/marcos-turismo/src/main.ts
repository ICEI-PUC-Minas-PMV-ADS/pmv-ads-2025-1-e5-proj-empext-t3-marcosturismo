import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Configuração adicional do appConfig para fornecer HttpClient com Fetch
const enhancedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideHttpClient(withFetch()) // Habilitar fetch no HttpClient
  ]
};

bootstrapApplication(AppComponent, enhancedAppConfig).catch((err) => console.error(err));

import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CoreModule } from './core/core-module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HomeModule } from './home/home-module';
import { NgxSpinnerModule } from "ngx-spinner";
import { loaderInterceptor } from './core/Interceptor/loader-interceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 1500,
      positionClass: 'toast-top-right',
      countDuplicates: true,
      progressBar: true
    }),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors([loaderInterceptor])
    ),
  ],
  bootstrap: [App]
})
export class AppModule { }

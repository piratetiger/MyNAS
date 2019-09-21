import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { BlockUIModule } from 'primeng/blockui';

import { AppComponent } from './app.component';
import { AppMainComponent } from './app-main/app-main.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppImagesComponent } from './app-images/app-images.component';
import { AppVideosComponent } from './app-videos/app-videos.component';
import { AppMoviesComponent } from './app-movies/app-movies.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponentsModule } from './infrastructure/components/app-components.module';
import { AppServiceModule } from './infrastructure/services/app.service.module';

import { AuthInterceptor } from './infrastructure/http-interceptor/auth-interceptor';
import { MessageInterceptor } from './infrastructure/http-interceptor/message-interceptor';
import { BusyIndicatorInterceptor } from './infrastructure/http-interceptor/busy-indicator-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    AppLoginComponent,
    AppImagesComponent,
    AppVideosComponent,
    AppMoviesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    AppRoutingModule,
    AppComponentsModule,
    AppServiceModule,

    InputTextModule,
    PasswordModule,
    FileUploadModule,
    ToastModule,
    CalendarModule,
    ButtonModule,
    AccordionModule,
    BlockUIModule,
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: BusyIndicatorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MessageInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

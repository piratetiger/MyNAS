import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { LightboxModule } from 'primeng/lightbox';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app-main/app-main.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppImagesComponent } from './app-images/app-images.component';
import { AppVideosComponent } from './app-videos/app-videos.component';
import { AppMoviesComponent } from './app-movies/app-movies.component';
import { ImagesService } from './app-images/images.service/images.service';
import { AppService } from './app.service/app.service';
import { LoginService } from './app-login/login.service/login.service';

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
    AppRoutingModule,
    HttpClientModule,

    InputTextModule,
    PasswordModule,
    FileUploadModule,
    LightboxModule,
    ToastModule,
    CalendarModule,
    ButtonModule,
  ],
  providers: [
    AppService,
    ImagesService,
    LoginService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

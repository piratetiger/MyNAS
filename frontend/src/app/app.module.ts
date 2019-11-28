import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppMainComponent } from './app-main/app-main.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppImagesComponent } from './app-images/app-images.component';
import { AppVideosComponent } from './app-videos/app-videos.component';
import { AppMoviesComponent } from './app-movies/app-movies.component';
import { AppSystemComponent } from './app-system/app-system.component';

import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { AppInfrastructureModule } from './infrastructure/app-infrastructure.module';

import { AuthInterceptor } from './infrastructure/http-interceptor/auth-interceptor';
import { MessageInterceptor } from './infrastructure/http-interceptor/message-interceptor';
import { BusyIndicatorInterceptor } from './infrastructure/http-interceptor/busy-indicator-interceptor';
import { AppUserProfileComponent } from './app-user-profile/app-user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppMainComponent,
    AppLoginComponent,
    AppImagesComponent,
    AppVideosComponent,
    AppMoviesComponent,
    AppSystemComponent,
    AppUserProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    AppRoutingModule,
    AdminModule,
    AppInfrastructureModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MessageInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BusyIndicatorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

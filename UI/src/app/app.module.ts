import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app-main/app-main.component';
import { AppImagesComponent } from './app-images/app-images.component';
import { AppVideosComponent } from './app-videos/app-videos.component';
import { AppMoviesComponent } from './app-movies/app-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    AppImagesComponent,
    AppVideosComponent,
    AppMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppMainComponent } from './app-main/app-main.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppImagesComponent } from './app-images/app-images.component';
import { AppVideosComponent } from './app-videos/app-videos.component';
import { AppMoviesComponent } from './app-movies/app-movies.component';
import { AppService } from './infrastructure/services/app.service/app.service';
import { AppSystemComponent } from './app-system/app-system.component';

const routes: Routes = [
  { path: '', component: AppMainComponent, canActivate: [AppService] },
  { path: 'login', component: AppLoginComponent },
  { path: 'images', component: AppImagesComponent, canActivate: [AppService] },
  { path: 'videos', component: AppVideosComponent, canActivate: [AppService] },
  { path: 'movies', component: AppMoviesComponent, canActivate: [AppService] },
  { path: 'system', component: AppSystemComponent, canActivate: [AppService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

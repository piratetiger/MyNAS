import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppMainComponent } from './app-main/app-main.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppImagesComponent } from './app-images/app-images.component';
import { AppVideosComponent } from './app-videos/app-videos.component';
import { AppMoviesComponent } from './app-movies/app-movies.component';

const routes: Routes = [
  { path: '', component: AppMainComponent },
  { path: 'login', component: AppLoginComponent },
  { path: 'images', component: AppImagesComponent },
  { path: 'videos', component: AppVideosComponent },
  { path: 'movies', component: AppMoviesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

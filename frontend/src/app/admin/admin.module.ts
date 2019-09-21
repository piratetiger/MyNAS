import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';

import { AppServiceModule } from '../infrastructure/services/app.service.module';

import { AppUserConfigComponent } from './app-user-config/app-user-config.component';
import { AppPipeModule } from '../infrastructure/pipes/app-pipe.module';


@NgModule({
    declarations: [
        AppUserConfigComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,

        AppServiceModule,
        AppPipeModule,

        TableModule
    ],
    exports: [
        AppUserConfigComponent,
    ],
    providers: [
    ],
})
export class AdminModule { }

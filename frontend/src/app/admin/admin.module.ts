import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AdminRoutingModule } from './admin-routing.module';
import { AppInfrastructureModule } from '../infrastructure/app-infrastructure.module';

import { AppUserConfigComponent } from './app-user-config/app-user-config.component';
import { AppAddUserComponent } from './app-user-config/app-add-user/app-add-user.component';

@NgModule({
    declarations: [
        AppUserConfigComponent,
        AppAddUserComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,

        AdminRoutingModule,
        AppInfrastructureModule,

        InputTextModule,
        PasswordModule,
        TableModule,
        ButtonModule,
        DynamicDialogModule,
        ConfirmDialogModule
    ],
    exports: [
        AppUserConfigComponent,
    ],
    providers: [
        DialogService,
        DynamicDialogConfig,
        DynamicDialogRef,
        ConfirmationService
    ],
    entryComponents: [
        AppAddUserComponent
    ]
})
export class AdminModule { }

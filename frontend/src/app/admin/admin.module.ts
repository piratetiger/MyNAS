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
import { ToolbarModule } from 'primeng/toolbar';

import { AdminRoutingModule } from './admin-routing.module';
import { AppInfrastructureModule } from '../infrastructure/app-infrastructure.module';

import { AdminUserConfigComponent } from './admin-user-config/admin-user-config.component';
import { AdminAddUserComponent } from './admin-user-config/admin-add-user/admin-add-user.component';
import { AdminMainComponent } from './admin-main/admin-main.component';

@NgModule({
    declarations: [
        AdminMainComponent,
        AdminUserConfigComponent,
        AdminAddUserComponent
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
        ConfirmDialogModule,
        ToolbarModule
    ],
    exports: [
        AdminUserConfigComponent,
    ],
    providers: [
        DialogService,
        DynamicDialogConfig,
        DynamicDialogRef,
        ConfirmationService
    ],
    entryComponents: [
        AdminAddUserComponent
    ]
})
export class AdminModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';

import { ImageLightboxComponent } from './image-lightbox/image-lightbox.component';
import { BusyIndicatorComponent } from './busy-indicator/busy-indicator.component';
import { ImageViewerComponent } from './image-lightbox/image-viewer/image-viewer.component';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/api';
import { UserRoleDropdownComponent } from './user-role-dropdown/user-role-dropdown.component';

@NgModule({
    declarations: [
        ImageLightboxComponent,
        ImageViewerComponent,
        BusyIndicatorComponent,
        UserRoleDropdownComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,

        BlockUIModule,
        ProgressSpinnerModule,
        DynamicDialogModule,
        DropdownModule
    ],
    exports: [
        ImageLightboxComponent,
        BusyIndicatorComponent,
        UserRoleDropdownComponent,
    ],
    providers: [
        DialogService,
        DynamicDialogConfig,
        DynamicDialogRef
    ],
    entryComponents: [
        ImageViewerComponent
    ]
})
export class AppComponentsModule { }

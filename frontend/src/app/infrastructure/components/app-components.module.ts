import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

import { ImageLightboxComponent } from './image-lightbox/image-lightbox.component';
import { BusyIndicatorComponent } from './busy-indicator/busy-indicator.component';
import { ImageViewerComponent } from './image-lightbox/image-viewer/image-viewer.component';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/api';

@NgModule({
    declarations: [
        ImageLightboxComponent,
        ImageViewerComponent,
        BusyIndicatorComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,

        BlockUIModule,
        ProgressSpinnerModule,
        DynamicDialogModule,
    ],
    exports: [
        ImageLightboxComponent,
        BusyIndicatorComponent,
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

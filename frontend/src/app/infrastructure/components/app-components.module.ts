import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/buffering';

import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';

import { LightboxComponent } from './lightbox/lightbox.component';
import { BusyIndicatorComponent } from './busy-indicator/busy-indicator.component';
import { ImageViewerComponent } from './lightbox/image-viewer/image-viewer.component';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/api';
import { UserRoleDropdownComponent } from './user-role-dropdown/user-role-dropdown.component';
import { VideoViewerComponent } from './lightbox/video-viewer/video-viewer.component';

@NgModule({
    declarations: [
        LightboxComponent,
        ImageViewerComponent,
        VideoViewerComponent,
        BusyIndicatorComponent,
        UserRoleDropdownComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,

        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,

        BlockUIModule,
        ProgressSpinnerModule,
        DynamicDialogModule,
        DropdownModule
    ],
    exports: [
        LightboxComponent,
        BusyIndicatorComponent,
        UserRoleDropdownComponent,
    ],
    providers: [
        DialogService,
        DynamicDialogConfig,
        DynamicDialogRef
    ],
    entryComponents: [
        ImageViewerComponent,
        VideoViewerComponent
    ]
})
export class AppComponentsModule { }

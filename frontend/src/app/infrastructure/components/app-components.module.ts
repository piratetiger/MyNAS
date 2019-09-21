import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ImageLightboxComponent } from './image-lightbox/image-lightbox.component';
import { BusyIndicatorComponent } from './busy-indicator/busy-indicator.component';

@NgModule({
    declarations: [
        ImageLightboxComponent,
        BusyIndicatorComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,

        BlockUIModule,
        ProgressSpinnerModule,
    ],
    exports: [
        ImageLightboxComponent,
        BusyIndicatorComponent,
    ],
    providers: [
    ],
})
export class AppComponentsModule { }

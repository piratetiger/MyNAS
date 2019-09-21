import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ImageLightboxComponent } from './image-lightbox/image-lightbox.component';

@NgModule({
    declarations: [
        ImageLightboxComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,

        CardModule,
    ],
    exports: [
        ImageLightboxComponent,
    ],
    providers: [
    ],
})
export class AppComponentsModule { }

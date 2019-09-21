import { NgModule } from '@angular/core';

import { AppService } from './app.service/app.service';
import { ApiService } from './api.service/api.service';

@NgModule({
    declarations: [
    ],
    imports: [
    ],
    exports: [
    ],
    providers: [
        AppService,
        ApiService
    ],
})
export class AppServiceModule { }

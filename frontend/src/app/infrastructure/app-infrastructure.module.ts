import { NgModule } from '@angular/core';
import { AppComponentsModule } from './components/app-components.module';
import { AppPipeModule } from './pipes/app-pipe.module';
import { AppServiceModule } from './services/app.service.module';


@NgModule({
    declarations: [
    ],
    imports: [
        AppComponentsModule,
        AppPipeModule,
        AppServiceModule
    ],
    exports: [
        AppComponentsModule,
        AppPipeModule,
        AppServiceModule
    ],
    providers: [
    ],
})
export class AppInfrastructureModule { }

import { NgModule } from '@angular/core';
import { AppComponentsModule } from './components/app-components.module';
import { AppPipesModule } from './pipes/app-pipes.module';
import { AppServicesModule } from './services/app-services.module';
import { AppDirectivesModule } from './directives/app-directives.module';


@NgModule({
    declarations: [
    ],
    imports: [
        AppComponentsModule,
        AppPipesModule,
        AppServicesModule,
        AppDirectivesModule
    ],
    exports: [
        AppComponentsModule,
        AppPipesModule,
        AppServicesModule,
        AppDirectivesModule
    ],
    providers: [
    ],
})
export class AppInfrastructureModule { }

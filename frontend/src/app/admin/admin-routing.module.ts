import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppUserConfigComponent } from './app-user-config/app-user-config.component';

const routes: Routes = [
    {
        path: 'admin',
        children: [
            { path: 'users', component: AppUserConfigComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }

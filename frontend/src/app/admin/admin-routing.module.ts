import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppUserConfigComponent } from './app-user-config/app-user-config.component';
import { AppService } from '../infrastructure/services/app.service/app.service';
import { UserRole } from '../infrastructure/models/user-role';

const routes: Routes = [
    {
        path: 'admin',
        data: {
            role: [UserRole.DataAdmin, UserRole.SystemAdmin]
        },
        canActivateChild: [AppService],
        children: [
            {
                path: 'users', component: AppUserConfigComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }

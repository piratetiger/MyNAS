import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserConfigComponent } from './admin-user-config/admin-user-config.component';
import { AppService } from '../infrastructure/services/app.service/app.service';
import { UserRole } from '../infrastructure/models/user-role';

const routes: Routes = [
    {
        path: 'admin',
        data: {
            role: [UserRole.SystemAdmin]
        },
        canActivateChild: [AppService],
        children: [
            { path: 'users', component: AdminUserConfigComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }

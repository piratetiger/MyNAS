import { Component } from '@angular/core';
import { AdminApiService } from '../../../infrastructure/services/admin-api.service/admin-api.service';
import { UserModel } from '../../../infrastructure/models/user-model';
import { UserRole } from '../../../infrastructure/models/user-role';

@Component({
    selector: 'app-add-user',
    templateUrl: './app-add-user.component.html',
    styleUrls: ['./app-add-user.component.scss']
})
export class AppAddUserComponent {
    public user: UserModel;

    constructor(private service: AdminApiService) {
        this.user = new UserModel();
        this.user.role = UserRole.User;
    }
}

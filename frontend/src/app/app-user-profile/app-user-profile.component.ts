import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/api';
import { UserModel } from '../infrastructure/models/user-model';
import { AppService } from '../infrastructure/services/app.service/app.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './app-user-profile.component.html',
    styleUrls: ['./app-user-profile.component.scss']
})
export class AppUserProfileComponent {
    public user: UserModel;

    constructor(private appService: AppService) {
        this.user = appService.userInfo;
    }

    public submit() {
        // this.service.createUser({
        //     user: this.user,
        //     password: this.user.password
        // }).subscribe(d => {
        //     this.ref.close();
        // });
    }
}

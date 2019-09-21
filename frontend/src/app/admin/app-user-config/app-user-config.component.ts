import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../infrastructure/models/user-model';
import { AdminApiService } from '../../infrastructure/services/admin-api.service/admin-api.service';

@Component({
    selector: 'app-user-config',
    templateUrl: './app-user-config.component.html',
    styleUrls: ['./app-user-config.component.scss']
})
export class AppUserConfigComponent implements OnInit {
    public users: UserModel[];

    constructor(private service: AdminApiService) { }

    ngOnInit(): void {
        this.refreshUsers();
    }

    public refreshUsers() {
        this.service.getUserList().subscribe(d => {
            this.users = [];
            if (d.data.length) {
                this.users = d.data;
            }
        });
    }
}

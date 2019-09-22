import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../infrastructure/models/user-model';
import { AdminApiService } from '../../infrastructure/services/admin-api.service/admin-api.service';
import { DialogService } from 'primeng/api';
import { AppAddUserComponent } from './app-add-user/app-add-user.component';

@Component({
    selector: 'app-user-config',
    templateUrl: './app-user-config.component.html',
    styleUrls: ['./app-user-config.component.scss']
})
export class AppUserConfigComponent implements OnInit {
    public users: UserModel[];
    public clonedUsers: { [s: string]: UserModel; } = {};

    constructor(private service: AdminApiService, private dialogService: DialogService) { }

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

    public newUser() {
        const ref = this.dialogService.open(AppAddUserComponent, {
            header: 'New User',
            width: '70%',
            height: '70%',
        });

        ref.onClose.subscribe(d => {
            this.refreshUsers();
        });
    }

    public rowEditInit(user: UserModel) {
        this.clonedUsers[user.userName] = { ...user };
    }

    public rowEditSave(user: UserModel) {
        // if (car.year > 0) {
        //     delete this.clonedCars[car.vin];
        //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Car is updated' });
        // }
        // else {
        //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Year is required' });
        // }
    }

    public rowEditCancel(user: UserModel, index: number) {
        this.users[index] = this.clonedUsers[user.userName];
        delete this.clonedUsers[user.userName];
    }
}

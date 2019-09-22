import { Component } from '@angular/core';
import { AdminApiService } from '../../../infrastructure/services/admin-api.service/admin-api.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './app-add-user.component.html',
    styleUrls: ['./app-add-user.component.scss']
})
export class AppAddUserComponent {

    constructor(private service: AdminApiService) { }

}

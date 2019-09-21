import { Component, Inject } from '@angular/core';
import * as store from 'store';
import { Router } from '@angular/router';
import { ApiService } from '../infrastructure/services/api.service/api.service';

@Component({
    selector: 'app-login',
    templateUrl: './app-login.component.html',
    styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent {
    public username: string;
    public password: string;

    constructor(private service: ApiService, private router: Router) {
    }

    public submit() {
        this.service.login({
            username: this.username,
            password: this.password
        }).subscribe(d => {
            if (d.data) {
                store.set('loginInfo', d.data);
                this.router.navigateByUrl('/');
            } else {
                this.password = '';
            }
        });
    }
}

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../infrastructure/services/api.service/api.service';
import { AppService } from '../infrastructure/services/app.service/app.service';

@Component({
    selector: 'app-login',
    templateUrl: './app-login.component.html',
    styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent implements OnDestroy {
    public username: string;
    public password: string;

    constructor(private service: ApiService, private appService: AppService, private router: Router) {
        this.appService.showFooter.emit(false);
    }

    ngOnDestroy() {
        this.appService.showFooter.emit(true);
    }

    public submit() {
        this.service.login({
            username: this.username,
            password: this.password
        }).subscribe(d => {
            if (d.data) {
                this.appService.userInfo = d.data;
                this.router.navigateByUrl('/');
            } else {
                this.password = '';
            }
        });
    }
}

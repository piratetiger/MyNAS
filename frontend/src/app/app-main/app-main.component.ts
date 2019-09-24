import { Component, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../infrastructure/services/app.service/app.service';

@Component({
    selector: 'app-main',
    templateUrl: './app-main.component.html',
    styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent implements OnDestroy {
    constructor(private router: Router, private appService: AppService) {
        this.appService.showFooter.emit(false);
    }

    ngOnDestroy() {
        this.appService.showFooter.emit(true);
    }

    public updateRoute(path: string) {
        this.router.navigateByUrl('/' + path);
    }
}

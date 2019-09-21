import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as store from 'store';
import { MessageModel } from '../../models/message-model';

@Injectable()
export class AppService implements CanActivate {
    public messages = new EventEmitter<MessageModel>();

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot)
        : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const loginInfo = store.get('loginInfo');
        if (loginInfo) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}

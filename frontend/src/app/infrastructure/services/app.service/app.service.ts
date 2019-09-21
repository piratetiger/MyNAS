import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as store from 'store';
import { MessageModel } from '../../models/message-model';
import { UserModel } from '../../models/user-model';

@Injectable()
export class AppService implements CanActivate {
    public messages = new EventEmitter<MessageModel>();
    public busyIndicator = new EventEmitter<boolean>();

    public get userInfo(): UserModel {
        return store.get('loginInfo');
    }

    public set userInfo(value: UserModel) {
        store.set('loginInfo', value);
    }

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot)
        : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const loginInfo = this.userInfo;
        if (loginInfo) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}

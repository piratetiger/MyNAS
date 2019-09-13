import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as store from 'store';
import { UserModel } from '../app.models/user-model';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginInfo: UserModel = store.get('loginInfo');
        let headers = req.headers;
        if (loginInfo && loginInfo.userName && loginInfo.token) {
            headers = headers.set('x-login-token', loginInfo.token)
                .set('x-login-user', loginInfo.userName);
        }

        return next.handle(req.clone({ headers: headers })).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401 || err.status === 403) {
                        this.router.navigate(['/login']);
                    }
                }
                return throwError(err);
            }));
    }
}

import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import * as store from 'store';
import { LoginModel } from '../app.models/login-model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginInfo: LoginModel = store.get('loginInfo');
        let headers = req.headers;
        if (loginInfo) {
            headers = headers.set('x-login-token', loginInfo.token)
                .set('x-login-user', loginInfo.username);
        }

        return next.handle(req.clone({ headers: headers }));
    }
}

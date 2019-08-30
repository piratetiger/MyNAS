import { Injectable } from '@angular/core';

import serviceList from './login.service-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
    public serviceUrls = serviceList;

    constructor(private http: HttpClient) { }

    public login(body: any): Observable<any> {
        return this.http.post(serviceList.login, body);
    }
}

import { Injectable } from '@angular/core';

import serviceList from './login.service-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataResult } from '../../app.models/data-result';

@Injectable()
export class LoginService {
    public serviceUrls = serviceList;

    constructor(private http: HttpClient) { }

    public login(body: any): Observable<DataResult<string>> {
        return this.http.post<DataResult<string>>(serviceList.login, body);
    }
}

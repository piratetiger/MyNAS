import { Injectable } from '@angular/core';

import serviceList from './admin-api.service-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserModel } from '../../models/user-model';
import { DataResult } from '../../models/data-result';

@Injectable()
export class AdminApiService {
    public serviceUrls = serviceList;

    constructor(private http: HttpClient) { }

    public getUserList(): Observable<DataResult<UserModel[]>> {
        return this.http.post<DataResult<UserModel[]>>(serviceList.getUserList, {});
    }
}

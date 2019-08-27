import { Injectable } from '@angular/core';

import serviceList from './images.service-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ImagesService {
    constructor(private http: HttpClient) { }

    public uploadImage(body: any): Observable<any> {
        return this.http.post(serviceList.uploadImage, body);
    }

    public getImageList(body: any): Observable<any> {
        return this.http.post(serviceList.getImageList, body);
    }
}

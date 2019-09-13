import { Injectable } from '@angular/core';

import serviceList from './images.service-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataResult } from '../../app.models/data-result';
import { ImageModel } from 'src/app/app.models/image-model';

@Injectable()
export class ImagesService {
    public serviceUrls = serviceList;

    constructor(private http: HttpClient) { }

    public uploadImage(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList.uploadImage, body);
    }

    public getImageList(body: any): Observable<DataResult<ImageModel[]>> {
        return this.http.post<DataResult<ImageModel[]>>(serviceList.getImageList, body);
    }
}

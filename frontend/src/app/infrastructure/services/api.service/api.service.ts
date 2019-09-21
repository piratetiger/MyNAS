import { Injectable } from '@angular/core';

import serviceList from './api.service-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataResult } from '../../models/data-result';
import { ImageModel } from '../../models/image-model';
import { VideoModel } from '../../models/video-model';

@Injectable()
export class ApiService {
    public serviceUrls = serviceList;

    constructor(private http: HttpClient) { }

    public login(body: any): Observable<DataResult<string>> {
        return this.http.post<DataResult<string>>(serviceList.login, body);
    }

    // images
    public uploadImage(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList.uploadImage, body);
    }
    public getImageList(body: any): Observable<DataResult<ImageModel[]>> {
        return this.http.post<DataResult<ImageModel[]>>(serviceList.getImageList, body);
    }

    // videos
    public uploadVideo(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList.uploadVideo, body);
    }
    public getVideoList(body: any): Observable<DataResult<VideoModel[]>> {
        return this.http.post<DataResult<VideoModel[]>>(serviceList.getVideoList, body);
    }
}
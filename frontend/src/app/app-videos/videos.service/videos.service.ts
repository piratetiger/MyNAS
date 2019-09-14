import { Injectable } from '@angular/core';

import serviceList from './videos.service-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataResult } from '../../app.models/data-result';
import { VideoModel } from '../../app.models/video-model';

@Injectable()
export class VideosService {
    public serviceUrls = serviceList;

    constructor(private http: HttpClient) { }

    public uploadVideo(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList.uploadVideo, body);
    }

    public getVideoList(body: any): Observable<DataResult<VideoModel[]>> {
        return this.http.post<DataResult<VideoModel[]>>(serviceList.getVideoList, body);
    }
}

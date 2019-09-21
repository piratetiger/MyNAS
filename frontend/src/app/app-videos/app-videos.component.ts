import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { groupBy } from 'lodash';
import { ApiService } from '../infrastructure/services/api.service/api.service';
import { VideoModel } from '../infrastructure/models/video-model';

@Component({
    selector: 'app-videos',
    templateUrl: './app-videos.component.html',
    styleUrls: ['./app-videos.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppVideosComponent implements OnInit {
    public videosGroup: any[];
    public uploadFileList: any[] = [];
    public startDate: Date;
    public endDate: Date;
    public videosDate: Date = new Date();

    constructor(private service: ApiService) {
        this.startDate = moment().subtract(3, 'months').toDate();
        this.endDate = new Date();
    }

    ngOnInit(): void {
        this.refreshVideos();
    }

    public uploadFiles(event) {
        const formData = new FormData();
        for (const file of event.files) {
            formData.append('files', file);
        }
        formData.set('date', moment(this.videosDate).format('YYYYMMDD'));
        this.service.uploadVideo(formData).subscribe(d => {
            this.uploadFileList = [];
            if (d.data) {
                this.refreshVideos();
            }
        });
    }

    public refreshVideos() {
        this.service.getVideoList({
            start: moment(this.startDate).format('YYYYMMDD'),
            end: moment(this.endDate).format('YYYYMMDD')
        }).subscribe(d => {
            this.videosGroup = [];
            if (d.data.length) {
                const groups = groupBy(d.data, (i: VideoModel) => i.date);
                for (const i of Object.keys(groups)) {
                    this.videosGroup.push({
                        date: moment(i).format('YYYY MM DD'),
                        videos: groups[i].map((s: VideoModel) => {
                            return {
                                source: this.service.serviceUrls.getVideo + '?thumb=false&name=' + s.fileName,
                                thumbnail: this.service.serviceUrls.getVideo + '?thumb=true&name=' + s.fileName,
                            };
                        })
                    });
                }
            }
        });
    }
}

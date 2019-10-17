import { Component, OnInit, ViewEncapsulation, ViewChildren, QueryList } from '@angular/core';
import * as moment from 'moment';
import { groupBy, flatten } from 'lodash';
import { ApiService } from '../infrastructure/services/api.service/api.service';
import { VideoModel } from '../infrastructure/models/video-model';
import { LightboxComponent } from '../infrastructure/components/lightbox/lightbox.component';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-videos',
    templateUrl: './app-videos.component.html',
    styleUrls: ['./app-videos.component.scss'],
})
export class AppVideosComponent implements OnInit {
    private _toolbarState: string;

    public viewMode = true;
    public videosGroup: any[];
    public uploadFileList: any[] = [];
    public startDate: Date;
    public endDate: Date;
    public videosDate: Date = new Date();

    public get selectedItems(): string[] {
        return flatten(this.lightboxes.map(l => l.selectedItems));
    }

    @ViewChildren('lightbox') lightboxes: QueryList<LightboxComponent>;

    public get toolbarState(): string {
        return this._toolbarState;
    }

    public set toolbarState(value) {
        if (value === this._toolbarState) {
            this._toolbarState = null;
        } else {
            this._toolbarState = value;
        }
    }

    constructor(private service: ApiService, private confirmationService: ConfirmationService) {
        this.startDate = moment().subtract(3, 'months').toDate();
        this.endDate = new Date();
    }

    ngOnInit(): void {
        this.refreshVideos();
    }

    public deleteFiles() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete all those items?',
            accept: () => {
                this.service.deleteVideo({
                    names: this.selectedItems
                }).subscribe(d => {
                    this.refreshVideos();
                });
            }
        });
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
                        videos: groups[i].map(m => m.fileName).reverse()
                    });
                }
            }
        });
    }
}

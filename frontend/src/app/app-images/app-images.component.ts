import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { groupBy } from 'lodash';
import { ApiService } from '../infrastructure/services/api.service/api.service';
import { ImageModel } from '../infrastructure/models/image-model';

@Component({
    selector: 'app-images',
    templateUrl: './app-images.component.html',
    styleUrls: ['./app-images.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppImagesComponent implements OnInit {
    public imagesGroup: any[];
    public uploadFileList: any[] = [];
    public startDate: Date;
    public endDate: Date;
    public imagesDate: Date = new Date();

    constructor(private service: ApiService) {
        this.startDate = moment().subtract(3, 'months').toDate();
        this.endDate = new Date();
    }

    ngOnInit(): void {
        this.refreshImages();
    }

    public uploadFiles(event) {
        const formData = new FormData();
        for (const file of event.files) {
            formData.append('files', file);
        }
        formData.set('date', moment(this.imagesDate).format('YYYYMMDD'));
        this.service.uploadImage(formData).subscribe(d => {
            this.uploadFileList = [];
            if (d.data) {
                this.refreshImages();
            }
        });
    }

    public refreshImages() {
        this.service.getImageList({
            start: moment(this.startDate).format('YYYYMMDD'),
            end: moment(this.endDate).format('YYYYMMDD')
        }).subscribe(d => {
            this.imagesGroup = [];
            if (d.data.length) {
                const groups = groupBy(d.data, (i: ImageModel) => i.date);
                for (const i of Object.keys(groups)) {
                    this.imagesGroup.push({
                        date: moment(i).format('YYYY MM DD'),
                        images: groups[i].reverse()
                    });
                }
            }
        });
    }
}

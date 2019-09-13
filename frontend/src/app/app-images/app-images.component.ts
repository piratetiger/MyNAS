import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ImagesService } from './images.service/images.service';
import * as moment from 'moment';

@Component({
    selector: 'app-images',
    templateUrl: './app-images.component.html',
    styleUrls: ['./app-images.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppImagesComponent implements OnInit {
    public images: any[];
    public uploadFileList: any[] = [];
    public startDate: Date;
    public endDate: Date;
    public imagesDate: Date = new Date();

    constructor(private service: ImagesService) {
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
            this.images = [];
            if (d.data.length) {
                for (const image of d.data) {
                    this.images.push({
                        source: this.service.serviceUrls.getImage + '?thumb=false&name=' + image.fileName,
                        thumbnail: this.service.serviceUrls.getImage + '?thumb=true&name=' + image.fileName,
                    });
                }
            }
        });
    }
}

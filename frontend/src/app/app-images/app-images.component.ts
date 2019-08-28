import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ImagesService } from './images.service/images.service';
import { MessageType, MessageModel } from '../app-models/message-model';
import { AppService } from '../app.service/app.service';
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

    constructor(private service: ImagesService, private appService: AppService) {
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
            this.refreshImages();
            const message = new MessageModel();
            message.type = d ? MessageType.Success : MessageType.Error;
            message.message = 'Upload Files ' + MessageType[message.type];
            this.appService.messages.emit(message);
        });
    }

    public refreshImages() {
        this.service.getImageList({
            start: moment(this.startDate).format('YYYYMMDD'),
            end: moment(this.endDate).format('YYYYMMDD')
        }).subscribe(d => {
            this.images = [];
            if (d.length) {
                for (const name of d) {
                    this.images.push({
                        source: this.service.serviceUrls.getImage + '?thumb=false&name=' + name,
                        thumbnail: this.service.serviceUrls.getImage + '?thumb=true&name=' + name,
                    });
                }
            }
        });
    }
}

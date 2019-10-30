import { Component, OnInit, ViewEncapsulation, ViewChildren, QueryList } from '@angular/core';
import * as moment from 'moment';
import { groupBy, flatten } from 'lodash';
import { ApiService } from '../infrastructure/services/api.service/api.service';
import { ImageModel } from '../infrastructure/models/image-model';
import { LightboxComponent } from '../infrastructure/components/lightbox/lightbox.component';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-images',
    templateUrl: './app-images.component.html',
    styleUrls: ['./app-images.component.scss'],
})
export class AppImagesComponent implements OnInit {
    private _toolbarState: string;

    public viewMode = true;
    public imagesGroup: any[];
    public uploadFileList: any[] = [];
    public startDate: Date;
    public endDate: Date;
    public owners: any[] = [];
    public selectedOwners: string[] = [];
    public imagesDate: Date = new Date();
    public newDate: Date = new Date();

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
        this.refreshImages();
        this.service.getUserList().subscribe(d => {
            this.owners = d.data.map(u => {
                return { 'label': u.nickName ? u.nickName : u.userName, 'value': u.userName };
            });
        });
    }

    public deleteFiles() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete all those items?',
            accept: () => {
                this.service.deleteImage({
                    names: this.selectedItems
                }).subscribe(d => {
                    this.refreshImages();
                });
            }
        });
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

    public updateDate() {
        const newModel = new ImageModel();
        newModel.date = moment.utc(moment(this.newDate).format('YYYYMMDD'), 'YYYYMMDD').toDate();
        this.service.updateImageDate({
            names: this.selectedItems,
            newModel: newModel
        }).subscribe(d => {
            this.refreshImages();
        });
    }

    public refreshImages() {
        this.service.getImageList({
            start: moment(this.startDate).format('YYYYMMDD'),
            end: moment(this.endDate).format('YYYYMMDD'),
            owner: this.selectedOwners
        }).subscribe(d => {
            this.imagesGroup = [];
            if (d.data.length) {
                const groups = groupBy(d.data, (i: ImageModel) => i.date);
                for (const i of Object.keys(groups)) {
                    this.imagesGroup.push({
                        date: moment(i).format('YYYY MM DD'),
                        images: groups[i].map(m => m.fileName).reverse()
                    });
                }
            }
        });
    }
}

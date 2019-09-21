import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/infrastructure/services/api.service/api.service';
import { ImageModel } from 'src/app/infrastructure/models/image-model';
import { DynamicDialogConfig } from 'primeng/api';

@Component({
    selector: 'image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImageViewerComponent implements OnInit {
    @Input() images: ImageModel[] = [];
    @Input() current: ImageModel;

    constructor(private service: ApiService, private config: DynamicDialogConfig) { }

    ngOnInit() {
        this.current = this.config.data.current;
        this.images = this.config.data.images;
    }

    public getImageUrl(image: string) {
        return `${this.service.serviceUrls.getImage}?thumb=false&name=${image}`;
    }
}

import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ImageModel } from '../../models/image-model';
import { ApiService } from '../../services/api.service/api.service';
import { DialogService } from 'primeng/api';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';

@Component({
    selector: 'image-lightbox',
    templateUrl: './image-lightbox.component.html',
    styleUrls: ['./image-lightbox.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImageLightboxComponent {
    @Input() images: ImageModel[] = [];

    constructor(private service: ApiService, private dialogService: DialogService) { }

    public getImageUrl(image: string) {
        return `${this.service.serviceUrls.getImage}?thumb=true&name=${image}`;
    }

    public showDetail(image: ImageModel) {
        const ref = this.dialogService.open(ImageViewerComponent, {
            data: {
                images: this.images,
                current: image
            },
            header: '',
            width: '70%',
            height: '70%',
            styleClass: 'image-lightbox-detail',
            dismissableMask: true
        });
    }
}

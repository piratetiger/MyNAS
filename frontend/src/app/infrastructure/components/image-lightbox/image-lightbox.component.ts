import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ImageModel } from '../../models/image-model';
import { ApiService } from '../../services/api.service/api.service';

@Component({
    selector: 'image-lightbox',
    templateUrl: './image-lightbox.component.html',
    styleUrls: ['./image-lightbox.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImageLightboxComponent {
    @Input() images: ImageModel[] = [];

    constructor(private service: ApiService) { }

    public getImageUrl(image: string) {
        return `${this.service.serviceUrls.getImage}?thumb=true&name=${image}`;
    }
}

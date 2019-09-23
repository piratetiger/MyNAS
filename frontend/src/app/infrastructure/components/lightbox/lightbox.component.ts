import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ImageModel } from '../../models/image-model';
import { ApiService } from '../../services/api.service/api.service';
import { DialogService } from 'primeng/api';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';

@Component({
    selector: 'lightbox',
    templateUrl: './lightbox.component.html',
    styleUrls: ['./lightbox.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LightboxComponent {
    @Input() sources: string[] = [];
    @Input() type = 'image';

    constructor(private service: ApiService, private dialogService: DialogService) { }

    public getImageUrl(source: string) {
        return `${this.service.serviceUrls.getImage}?thumb=true&name=${source}`;
    }

    public showDetail(source: string) {
        const ref = this.dialogService.open(ImageViewerComponent, {
            data: {
                sources: this.sources,
                current: source
            },
            header: '',
            width: '70%',
            height: '70%',
            styleClass: 'lightbox-detail',
            dismissableMask: true
        });
    }
}

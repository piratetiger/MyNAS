import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ApiService } from '../../services/api.service/api.service';
import { DialogService } from 'primeng/api';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { VideoViewerComponent } from './video-viewer/video-viewer.component';

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
        if (this.type === 'video') {
            return `${this.service.serviceUrls.getVideo}?thumb=true&name=${source}`;
        } else {
            return `${this.service.serviceUrls.getImage}?thumb=true&name=${source}`;
        }
    }

    public showDetail(source: string) {
        if (this.type === 'video') {
            this.dialogService.open(VideoViewerComponent, {
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
        } else {
            this.dialogService.open(ImageViewerComponent, {
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
}

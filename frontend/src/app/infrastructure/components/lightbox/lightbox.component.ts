import { Component, ViewEncapsulation, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class LightboxComponent implements OnChanges {
    public sourceList: any[];

    @Input() sources: string[] = [];
    @Input() type = 'image';
    @Input() editMode = false;

    public get selectedItems(): string[] {
        return this.sourceList.filter(s => s.selected).map(s => s.source);
    }

    constructor(private service: ApiService, private dialogService: DialogService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.sources) {
            this.sourceList = changes.sources.currentValue.map(s => {
                return { source: s, selected: false };
            });
        }
        if (changes.editMode) {
            this.sourceList.forEach(s => s.selected = false);
        }
    }

    public getImageUrl(source: string) {
        if (this.type === 'video') {
            return `${this.service.serviceUrls.getVideo}?thumb=true&name=${source}`;
        } else {
            return `${this.service.serviceUrls.getImage}?thumb=true&name=${source}`;
        }
    }

    public itemClick(item) {
        if (!this.editMode) {
            this.showDetail(item.source);
        } else {
            item.selected = !item.selected;
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

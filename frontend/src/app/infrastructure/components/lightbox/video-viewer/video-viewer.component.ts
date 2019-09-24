import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/infrastructure/services/api.service/api.service';
import { DynamicDialogConfig } from 'primeng/api';

@Component({
    selector: 'video-viewer',
    templateUrl: './video-viewer.component.html',
    styleUrls: ['./video-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VideoViewerComponent implements OnInit {
    @Input() sources: string[] = [];
    @Input() current: string;

    constructor(private service: ApiService, private config: DynamicDialogConfig) { }

    ngOnInit() {
        this.current = this.config.data.current;
        this.sources = this.config.data.sources;
    }

    public getVideoUrl(image: string) {
        return `${this.service.serviceUrls.getVideo}?thumb=false&name=${image}`;
    }
}

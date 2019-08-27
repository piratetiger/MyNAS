import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ImagesService } from './images.service/images.service';

@Component({
    selector: 'app-images',
    templateUrl: './app-images.component.html',
    styleUrls: ['./app-images.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppImagesComponent implements OnInit {
    public images: any[];

    constructor(private service: ImagesService) { }

    ngOnInit(): void {
        this.service.getImageList({}).subscribe(d => {
            if (d.length) {
                this.images = [];
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

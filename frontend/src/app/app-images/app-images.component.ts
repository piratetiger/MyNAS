import { Component, OnInit } from '@angular/core';
import { ImagesService } from './images.service/images.service';

@Component({
    selector: 'app-images',
    templateUrl: './app-images.component.html',
    styleUrls: ['./app-images.component.scss']
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
                        source: '/Api/Images?name=' + name,
                        thumbnail: '/Api/Images?thumb=true&name=' + name,
                    });
                }
            }
        });
    }
}

import { Component } from '@angular/core';
import { ImagesService } from './images.service/images.service';

@Component({
    selector: 'app-images',
    templateUrl: './app-images.component.html',
    styleUrls: ['./app-images.component.scss']
})
export class AppImagesComponent {
    constructor(private service: ImagesService) { }
}

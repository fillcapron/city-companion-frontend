import { Component, Input } from "@angular/core";
import { Images } from "src/app/admin/shared/interface";

@Component({
    selector: 'carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

    _images: Images[] = [];
    _inputArray: any[] = [];
    
    @Input() set images(images: Images[] | []) {
        this._images = images
    }
    @Input() set maxSlides(len: number){
        this._inputArray = Array(len).fill(null);
    }
}
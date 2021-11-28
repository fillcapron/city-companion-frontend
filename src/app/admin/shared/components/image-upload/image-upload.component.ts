import { Component, Output, EventEmitter } from "@angular/core";
import { ImagesService } from "src/app/shared/services/images.service";
@Component({
    selector: 'image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

    @Output() upload = new EventEmitter();

    file!: File;

    constructor(private service: ImagesService) { }

    onChange(event: any) {
        this.file = event.target.files[0];
    }

    async onUpload() {
        const formData = new FormData();
        formData.append('file', this.file);
        this.service.upload(formData).subscribe(
            (images) => this.upload.emit(images),
            (err) => console.log(err)
        )
    }
}
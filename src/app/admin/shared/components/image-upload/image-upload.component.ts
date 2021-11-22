import { Component } from "@angular/core";

@Component({
    selector: 'image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

    file!: File;

    constructor() {}

    onChange(event: any) {
        this.file = event.target.files[0];
    }

    onUpload(){
        console.log(this.file);
        const formData = new FormData();
        formData.append('image', this.file);
        fetch('https://api.imgbb.com/1/upload?expiration=600&key=6bc5e52e6e7269527190e01f01479346', {
            method: 'POST',
            body: formData
        }).then(res => console.log(res)).catch(err => console.log(err))
    }
}
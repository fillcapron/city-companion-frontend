import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from "@angular/core";
import { ImagesService } from "src/app/shared/services/images.service";

@Component({
    selector: 'upload-field',
    templateUrl: './upload-field.component.html',
    styleUrls: ['./upload-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFiledComponent {

    @Input() images: any = [];
    @Output() upload = new EventEmitter();

    constructor(private changeDetector: ChangeDetectorRef, private service: ImagesService) { }

    public async onUpload(file: any): Promise<void> {
        const formData = new FormData();
        formData.append('file', file);
        this.service.upload(formData).subscribe(
            (images) => {
                this.upload.emit(images);
                this.changeDetector.markForCheck();
            },
            (err) => console.log(err)
        )
    }

    public onDelete(file: any): void {
        this.images.splice(file, 1);
        this.changeDetector.markForCheck();
    }
}
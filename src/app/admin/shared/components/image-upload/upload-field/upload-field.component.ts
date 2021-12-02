import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from "@angular/core";
import { ImagesService } from "src/app/shared/services/images.service";
import { Images } from "../../../interface";

@Component({
    selector: 'upload-field',
    templateUrl: './upload-field.component.html',
    styleUrls: ['./upload-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFiledComponent {

    @Input() images: Images[] = [];
    @Input() disabled!: boolean;
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

    public onDelete(file: Images, index: number): void {
        const id = file && file.id;
        this.service.delete(id).subscribe(
            (res) => console.log(res),
            (err) => console.log(err)
        )
        this.images.splice(index, 1);
        this.changeDetector.markForCheck();
    }
}
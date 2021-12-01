import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector: "input[uploadFile], div[uploadFile]"
})
export class FileUploadDirective {

    private _field: any = null;

    constructor(private element: ElementRef) { }

    @Input('uploadFile')
    set fileUploadField(value: any) {
        if (value) {
            this._field = value;
        }
    }

    @HostListener("change", ["$event"])
    onChange(event: any): void {
        let files = this.element.nativeElement.files;

        for (let i = 0; i < files.length; i++) {
            this._field.onUpload(files[i]);
        }
        event.stopPropagation();
        this.element.nativeElement.value = "";
    }

    @HostListener("drop", ["$event"])
    onDrop(event: any): void {
        let files = event.dataTransfer.files;

        for (let i = 0; i < files.length; i++) {
            this._field.onUpload(files[i]);
        }

        event.preventDefault();
        event.stopPropagation();
        this.element.nativeElement.value = "";
    }

    @HostListener("dragover", ["$event"])
    public onDropOver(event: any): void {
        event.preventDefault();
    }
}
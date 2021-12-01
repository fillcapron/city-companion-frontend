import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FileUploadDirective } from "../../directives/upload-files.directive";
import { UploadFiledComponent } from "./upload-field/upload-field.component";

@NgModule({
    imports: [CommonModule],
    declarations: [FileUploadDirective, UploadFiledComponent],
    exports: [FileUploadDirective, UploadFiledComponent]
})
export class ImageUploadModule {}
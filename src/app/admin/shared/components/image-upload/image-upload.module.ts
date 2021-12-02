import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/material.module";
import { FileUploadDirective } from "../../directives/upload-files.directive";
import { UploadFiledComponent } from "./upload-field/upload-field.component";

@NgModule({
    imports: [CommonModule, MaterialModule],
    declarations: [FileUploadDirective, UploadFiledComponent],
    exports: [FileUploadDirective, UploadFiledComponent]
})
export class ImageUploadModule {}
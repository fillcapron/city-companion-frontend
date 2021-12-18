import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";
import { ImageUploadModule } from "../../shared/components/image-upload/image-upload.module";

import { AddressSearch } from "../../shared/components/address-input/address-search.component";
import { DialogPlaceComponent } from "./form/place-form.component";
import { TableGeneratedColumnsPlaces } from "./places.component";
import { CreateTagsModule } from "../../shared/components/create-tags/create-tags.module";
import { PhoneMaskDirective } from "../../shared/directives/phone-mask.directive";
@NgModule({
    declarations: [
        DialogPlaceComponent,
        TableGeneratedColumnsPlaces,
        AddressSearch,
        PhoneMaskDirective
    ],
    entryComponents: [DialogPlaceComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MaterialModule,
        ImageUploadModule,
        CreateTagsModule
    ],
    exports: []
})
export class PlacesModule { }
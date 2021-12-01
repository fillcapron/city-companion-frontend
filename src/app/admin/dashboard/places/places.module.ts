import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";
import { AddressSearch } from "../../shared/components/address-input/address-search.component";
import { ImageUploadModule } from "../../shared/components/image-upload/image-upload.module";


import { DialogPlaceComponent } from "./form/place-form.component";
import { TableGeneratedColumnsPlaces } from "./places.component";
@NgModule({
    declarations: [
        DialogPlaceComponent,
        TableGeneratedColumnsPlaces,
        AddressSearch
    ],
    entryComponents: [DialogPlaceComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MaterialModule,
        ImageUploadModule
    ],
    exports: []
})
export class PlacesModule { }
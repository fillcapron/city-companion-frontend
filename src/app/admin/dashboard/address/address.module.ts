import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";

import { TableGeneratedColumnsAddress } from "./address.component";
import { DialogAddressComponent } from "./form/address-form.component";



@NgModule({
    declarations: [
        DialogAddressComponent,
        TableGeneratedColumnsAddress
    ],
    entryComponents: [DialogAddressComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MaterialModule
    ],
})
export class AddressModule { }
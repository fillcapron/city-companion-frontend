import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { RouterModule, Routes } from "@angular/router";
import { TableGeneratedColumnsAddress } from "./address.component";
import { DialogAddressComponent } from "./form/address-form.component";


@NgModule({
    declarations: [
        DialogAddressComponent,
        TableGeneratedColumnsAddress
    ],
    entryComponents: [DialogAddressComponent],
    imports: [
        MatButtonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatIconModule,
        MatSelectModule
    ],
})
export class AddressModule { }
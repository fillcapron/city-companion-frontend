import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from '@angular/material/paginator';

import { DialogPlaceComponent } from "./form/place-form.component";
import { TableGeneratedColumnsPlaces } from "./places.component";

@NgModule({
    declarations: [
        DialogPlaceComponent,
        TableGeneratedColumnsPlaces
    ],
    entryComponents: [DialogPlaceComponent],
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatIconModule,
        MatSelectModule,
        MatPaginatorModule
    ],
})
export class PlacesModule { }
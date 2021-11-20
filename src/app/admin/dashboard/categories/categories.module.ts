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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';

import { TableGeneratedColumnsCategories } from "./categories.component";
import { DialogCategoryComponent } from "./form/category-form.component";
import { ConfirmComponent } from "../../shared/components/confirm/confirm.component";
import { MatDialogModule } from "@angular/material/dialog";


@NgModule({
    declarations: [
        DialogCategoryComponent,
        TableGeneratedColumnsCategories,
        ConfirmComponent
    ],
    entryComponents: [DialogCategoryComponent, ConfirmComponent],
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
        MatSelectModule,
        MatPaginatorModule,
        MatChipsModule,
        MatDialogModule 
    ]
})
export class CategoriesModule { }
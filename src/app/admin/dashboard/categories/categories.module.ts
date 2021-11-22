import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";

import { TableGeneratedColumnsCategories } from "./categories.component";
import { DialogCategoryComponent } from "./form/category-form.component";
import { ConfirmComponent } from "../../shared/components/confirm/confirm.component";
@NgModule({
    declarations: [
        DialogCategoryComponent,
        TableGeneratedColumnsCategories,
        ConfirmComponent
    ],
    entryComponents: [DialogCategoryComponent, ConfirmComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MaterialModule
    ]
})
export class CategoriesModule { }
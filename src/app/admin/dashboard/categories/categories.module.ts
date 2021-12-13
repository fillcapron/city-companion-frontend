import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";

import { TableGeneratedColumnsCategories } from "./categories.component";
import { DialogCategoryComponent } from "./form/category-form.component";
import { CreateTagsModule } from "../../shared/components/create-tags/create-tags.module";
@NgModule({
    declarations: [
        DialogCategoryComponent,
        TableGeneratedColumnsCategories
    ],
    entryComponents: [DialogCategoryComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MaterialModule,
        CreateTagsModule
    ]
})
export class CategoriesModule { }
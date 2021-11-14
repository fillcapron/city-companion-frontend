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

import { TableGeneratedColumnsCategories } from "./categories.component";
import { DialogCategoryComponent } from "./form/category-form.component";


@NgModule({
    declarations: [
        DialogCategoryComponent,
        TableGeneratedColumnsCategories
    ],
    entryComponents: [DialogCategoryComponent],
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
        MatPaginatorModule
    ],
})
export class CategoriesModule { }
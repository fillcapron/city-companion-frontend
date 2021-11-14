import { Component, Inject, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CategoryService } from "src/app/shared/services/category.service";
import { Categories } from "src/app/shared/interface";
import { EventsForm } from "src/app/admin/shared/interface";
import { isEmptyObject } from "src/app/admin/shared/utils";

@Component({
    selector: 'dialog-categories',
    templateUrl: 'category-form.component.html',
    styleUrls: ['category-form.component.scss']
})
export class DialogCategoryComponent implements OnInit, EventsForm {

    isReading!: boolean;
    isDisabledField!: boolean;

    category: Categories = {
        id: null,
        name: ''
    };

    constructor(
        public dialogRef: MatDialogRef<DialogCategoryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Categories,
        private serviceCategory: CategoryService,
    ) { }

    ngOnInit(): void {
        this.category = Object.assign(this.category, this.data);
        if (!isEmptyObject(this.data)) {
            this.isReading = true;
            this.isDisabledField = true;
        }
    }

    submit(formCategory: NgForm): void {

        if (this.isReading) {
            this.serviceCategory.updateCategory({ id: this.category.id, name: formCategory.value.name }).subscribe(
                (res) => {
                    this.dialogRef.close(res?.message);
                },
                (err) => this.dialogRef.close(err));
        } else {
            this.serviceCategory.createCategory(formCategory.value).subscribe(
                (category) => {
                    this.dialogRef.close(category?.message);
                },
                (err) => this.dialogRef.close(err)
            );
        }
    }

    deleting(): void {
        this.serviceCategory.deleteCategory(this.category.id).subscribe((res) => {
            this.dialogRef.close(res?.message);
        },
            (err) => this.dialogRef.close(err));
    }

    close(): void {
        this.dialogRef.close()
    }

    reading(): void {
        this.isDisabledField = false;
    }
}
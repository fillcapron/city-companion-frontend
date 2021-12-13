import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CategoryService } from "src/app/shared/services/category.service";
import { Categories } from "src/app/shared/interface";
import { EventsForm, Tag } from "src/app/admin/shared/interface";
import { isEmptyObject } from "src/app/admin/shared/utils";
import { MatChipInputEvent, MatChipList } from "@angular/material/chips";
import { TagService } from "src/app/admin/shared/services/tag.service";
import { switchMap } from "rxjs/operators";
import { ConfirmDialogService } from "src/app/admin/shared/components/confirm/confirm.service";

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

    tags: Tag[] = [];

    constructor(
        public dialogRef: MatDialogRef<DialogCategoryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Categories,
        private serviceCategory: CategoryService,
        private serviceTag: TagService,
        private confirmDialog: ConfirmDialogService
    ) { }

    ngOnInit(): void {
        this.category = Object.assign(this.category, this.data);
        if (isEmptyObject(this.data)) return
        this.tags = this.data.tags || [];
        this.isReading = true;
        this.isDisabledField = true;
    }

    submit(formCategory: NgForm): void {

        if (this.isReading) {
            this.serviceCategory.updateCategory({ id: this.category.id, name: formCategory.value.name }).subscribe(
                (res) => {
                    this.dialogRef.close(res?.message);
                },
                (err) => this.dialogRef.close(err));
        } else {
            this.serviceCategory.createCategory(formCategory.value).pipe(
                switchMap(category => {
                    if (this.category.tags?.length) {
                        this.category.tags.map(elem => {
                            elem.category = category.meta.id;
                        });
                    }
                    return this.serviceTag.createTags(this.category.tags!);
                })
            ).subscribe(
                () => this.dialogRef.close('Категория создана'),
                (err) => this.dialogRef.close(err)
            )
        }
    }

    deleting(): void {
        this.confirmDialog.confirm('Хотите удалить запись?', 'Да', 'Нет').afterClosed().subscribe(
            result => {
                if (result) {
                    this.serviceCategory.deleteCategory(this.category.id).subscribe(
                        (res) => this.dialogRef.close(res?.message),
                        (err) => this.dialogRef.close(err))
                }
            }
        )
    }

    close(): void {
        this.dialogRef.close();
    }

    reading(): void {
        this.isDisabledField = false;
    }

    cancel(): void {
        if (!this.isReading) return this.dialogRef.close('Отменено')
        this.isDisabledField = true;
    }
}
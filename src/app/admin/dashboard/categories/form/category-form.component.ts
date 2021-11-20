import { Component, Inject, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CategoryService } from "src/app/shared/services/category.service";
import { Categories } from "src/app/shared/interface";
import { EventsForm, Tag } from "src/app/admin/shared/interface";
import { isEmptyObject } from "src/app/admin/shared/utils";
import { MatChipInputEvent } from "@angular/material/chips";
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
    selectable = false;
    removable!: boolean;
    addOnBlur = true;

    category: Categories = {
        id: null,
        name: '',
        tags: []
    };

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
        this.isReading = true;
        this.removable = false;
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
                (res) => this.dialogRef.close('Категория создана'),
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
        this.removable = true;
    }

    addTag(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (this.category.id && value) {
            this.serviceTag.createTag({ name: value, category: this.category.id }).subscribe(
                (tag) => tag.error ? this.category.tags!.push(tag) : null,
                (err) => alert(err)
            );
        } else if (value) {
            this.category.tags!.push({ name: value });
        }
        event.chipInput!.clear();
    }

    remove(tag: Tag): void {
        this.serviceTag.deleteTag(tag.id).subscribe(
            (tag) => console.log(tag?.message),
            (err) => alert(err)
        )
        this.category.tags = this.category.tags?.filter(elem => elem.id !== tag.id);
    }

    cancel(): void {
        if (!this.isReading) return this.dialogRef.close('Отменено')
        this.isDisabledField = true;
        this.removable = false;
    }
}
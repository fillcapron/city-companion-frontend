import { Component, Inject, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { switchMap } from "rxjs/operators";
import { Place } from "src/app/shared/interface";
import { EventsForm, User } from "src/app/admin/shared/interface";
import { UserService } from "src/app/admin/shared/services/user.service";
import { isEmptyObject } from "src/app/admin/shared/utils";

@Component({
    selector: 'dialog-user',
    templateUrl: 'user-form.component.html',
    styleUrls: ['user-form.component.scss']
})
export class DialogUserComponent implements OnInit, EventsForm {

    isReading!: boolean;
    isDisabledField!: boolean;

    user: User = {
        id: null,
        name: '',
        email: '',
        password: ''
    }

    constructor(
        public dialogRef: MatDialogRef<DialogUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Place,
        private serviceUser: UserService
    ) { }

    ngOnInit(): void {
        this.user = Object.assign(this.user, this.data);
        if (!isEmptyObject(this.data)) {
            this.isReading = true;
            this.isDisabledField = true;
        }
    }
    submit(formUser: NgForm) {
        if (this.isReading) {
            this.serviceUser.updateUser({ ...formUser.value, id: this.user.id }).subscribe(
                (user) => {
                    this.dialogRef.close(user?.message);
                },
                (err) => {
                    this.dialogRef.close(err);
                }
            )
        } else {
            this.serviceUser.createUser(formUser.value)
                .subscribe(
                    (user) => {
                        this.dialogRef.close('Пользователь создан');
                    },
                    (err) => {
                        this.dialogRef.close(err);
                    }
                );
        }
    }

    deleting(): void {
        this.serviceUser.deleteUser(this.user.id || null).subscribe(
            (user) => {
                this.dialogRef.close(user?.message);
            },
            (err) => {
                this.dialogRef.close(err);
            }
        )
    }

    reading(): void {
        this.isDisabledField = false;
    }

    close(): void {
        this.dialogRef.close();
    }

    cancel(): void {
        this.isDisabledField = true;
    }
}
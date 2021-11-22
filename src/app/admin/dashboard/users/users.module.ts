import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";

import { DialogUserComponent } from "./form/user-form.component";
import { TableGeneratedColumnsUsers } from "./users.component";
@NgModule({
    declarations: [
        DialogUserComponent,
        TableGeneratedColumnsUsers
    ],
    entryComponents: [DialogUserComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MaterialModule
    ],
})
export class UsersModule { }
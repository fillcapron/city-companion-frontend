import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "src/app/material.module";
import { ReviewsDialogComponent } from "./reviews-dialog.component";

@NgModule({
    declarations: [ReviewsDialogComponent],
    imports: [MaterialModule, FormsModule, BrowserModule],
    exports: [ReviewsDialogComponent]
})
export class ReviewsDialogModule{ }
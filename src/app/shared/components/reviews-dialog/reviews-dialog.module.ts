import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "src/app/material.module";
import { RatingModule } from "../rating/rating.module";
import { ReviewsListModule } from "../reviews-list/reviews-list.module";
import { ReviewsDialogComponent } from "./reviews-dialog.component";

@NgModule({
    declarations: [ReviewsDialogComponent],
    imports: [MaterialModule, FormsModule, BrowserModule, ReviewsListModule, RatingModule],
    exports: [ReviewsDialogComponent]
})
export class ReviewsDialogModule{ }
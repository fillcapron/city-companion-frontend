import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/material.module";
import { RatingModule } from "../rating/rating.module";
import { ReviewsListComponent } from "./reviews-list.component";

@NgModule({
    imports: [MaterialModule, CommonModule, RatingModule],
    declarations: [ReviewsListComponent],
    exports: [ReviewsListComponent]
})
export class ReviewsListModule { }
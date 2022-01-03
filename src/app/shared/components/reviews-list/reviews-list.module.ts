import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/material.module";
import { ReviewsListComponent } from "./reviews-list.component";

@NgModule({
    imports: [MaterialModule, CommonModule],
    declarations: [ReviewsListComponent],
    exports: [ReviewsListComponent]
})
export class ReviewsListModule { }
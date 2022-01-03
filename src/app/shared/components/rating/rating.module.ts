import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/material.module";
import { RatingComponent } from "./rating.component";

@NgModule({
    declarations: [RatingComponent],
    imports: [CommonModule, MaterialModule],
    exports: [RatingComponent]
})
export class RatingModule { }
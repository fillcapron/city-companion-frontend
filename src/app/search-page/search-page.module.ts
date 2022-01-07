import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material.module";
import { SearchPageComponent } from "./search-page.component";

@NgModule({
    imports: [CommonModule, MaterialModule],
    declarations: [SearchPageComponent],
    exports: [SearchPageComponent]
})
export class SearchPageModule { }
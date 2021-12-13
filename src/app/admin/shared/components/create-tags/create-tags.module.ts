import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "src/app/material.module";
import { CreateTagsComponent } from "./create-tags.component";

@NgModule({
    declarations: [ CreateTagsComponent],
    exports: [CreateTagsComponent],
    imports: [MaterialModule, BrowserModule]
})
export class CreateTagsModule{ }
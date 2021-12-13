import { Component, Input, ViewChild } from "@angular/core";
import { MatChipInputEvent, MatChipList } from "@angular/material/chips";
import { Tag } from "../../interface";
import { TagService } from "../../services/tag.service";

@Component({
    selector: 'create-tags',
    templateUrl: './create-tags.component.html',
    styleUrls: ['./create-tags.component.scss']
})
export class CreateTagsComponent {

    _tags: Tag[] = [];

    @Input() set tags(data: Tag[]) {
        this._tags = data;
    }
    @Input() type!: string;
    @Input() id!: number | null;
    @Input() disabled!: boolean;
    @ViewChild("chipList") chipList!: MatChipList;
    selectable = false;
    addOnBlur = true;

    constructor(private serviceTag: TagService) { }

    addTag(event: MatChipInputEvent): void {
        const value = (event.value || '').toLowerCase().trim();
        if (this._tags?.some((tag) => tag.name === value)) {
            this.chipList.errorState = true;
            return;
        }
        if (this.id && value) {
            this.serviceTag.createTag({ name: value, [this.type]: this.id }).subscribe(
                (tag: any) => tag.error ? null : this._tags.push(tag),
                (err) => alert(err)
            );
        } else if (value) {
            this._tags.push({ name: value });
        }
        event.chipInput!.clear();
    }

    remove(tag: Tag): void {
        this.serviceTag.deleteTag(tag.id).subscribe(
            (tag) => console.log(tag?.message),
            (err) => alert(err)
        )
        this._tags = this._tags.filter(elem => elem.id !== tag.id);
    }
}
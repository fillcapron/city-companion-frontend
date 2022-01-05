import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Reviews } from "../../interface";

@Component({
    selector: 'reviews-list',
    templateUrl: './reviews-list.component.html',
    styleUrls: ['./reviews-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsListComponent {

    length: number = 0;
    pagedList: Reviews[] = [];
    pageSize: number = 5;
    pageEvent!: PageEvent;
    pageSizeOptions: number[] = [5, 10, 15];
    reviews: Reviews[] = [];
    @Input()
    set reviewsArray(reviews: Reviews[]) {
        this.reviews = reviews;
        this.pagedList = this.reviews.slice(0, this.pageSize);
        this.length = this.reviews.length;
    }

    OnPageChange(event: PageEvent) {
        let startIndex = event.pageIndex * event.pageSize;
        let endIndex = startIndex + event.pageSize;
        if (endIndex > this.length) {
            endIndex = this.length;
        }
        this.pagedList = this.reviews.slice(startIndex, endIndex);
        return this.pageEvent;
    }
}
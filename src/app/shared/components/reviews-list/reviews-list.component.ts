import { Component, Input, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Reviews } from "../../interface";

@Component({
    selector: 'reviews-list',
    templateUrl: './reviews-list.component.html',
    styleUrls: ['./reviews-list.component.scss']
})
export class ReviewsListComponent implements OnInit {

    length: number = 0;
    pagedList: Reviews[] = [];
    pageSize: number = 5;
    pageEvent!: PageEvent;
    pageSizeOptions: number[] = [5, 10, 15];
    reviews: Reviews[] = [];
    @Input() reviewsArray!: Reviews[];

    ngOnInit(): void {
        this.reviews = this.reviewsArray;
        this.pagedList = this.reviews.slice(0, this.pageSize);
        this.length = this.reviews.length;
    }

    OnPageChange(event: PageEvent) {
        let startIndex = event.pageIndex * event.pageSize;
        let endIndex = startIndex + event.pageSize;
        if (endIndex > this.length) {
            endIndex = this.length;
        }
        this.pagedList = this.reviewsArray.slice(startIndex, endIndex);
        return this.pageEvent;
    }
}
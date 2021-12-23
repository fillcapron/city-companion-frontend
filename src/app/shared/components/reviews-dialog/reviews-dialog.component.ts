import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reviews } from "../../interface";

@Component({
    selector: 'reviews-dialog',
    templateUrl: './reviews-dialog.component.html',
    styleUrls: ['./reviews-dialog.component.scss']
})
export class ReviewsDialogComponent {

    reviews!: Reviews[];
    name!: string;

    constructor(
        public dialogRef: MatDialogRef<ReviewsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {name: string, reviews: Reviews[]},
    ) { 
        this.reviews = data.reviews;
        this.name = data.name;
    }
}
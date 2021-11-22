import { Component, Inject, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddressService } from "src/app/shared/services/address.service";
import { CategoryService } from "src/app/shared/services/category.service";
import { Address, Categories, Place } from "src/app/shared/interface";
import { PlaceService } from "src/app/shared/services/places.service";
import { EventsForm } from "src/app/admin/shared/interface";
import { isEmptyObject } from "src/app/admin/shared/utils";
import { switchMap } from "rxjs/operators";

@Component({
    selector: 'dialog-places',
    templateUrl: 'place-form.component.html',
    styleUrls: ['place-form.component.scss']
})
export class DialogPlaceComponent implements OnInit, EventsForm {

    isReading!: boolean;
    isDisabledField!: boolean;

    categories: Categories[] = [];

    place: Place = {
        id: null,
        name: "",
        rating: "",
        website: "",
        description: "",
        published: false,
        category: {
            id: null,
            name: ''
        },
        address: null
    }

    address: Address = {
        id: null,
        country: '',
        region: '',
        city: '',
        street: '',
        house: ''
    };

    constructor(
        public dialogRef: MatDialogRef<DialogPlaceComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Place,
        private serviceCategory: CategoryService,
        private serviceAddress: AddressService,
        private servicePlace: PlaceService
    ) { }

    ngOnInit(): void {
        this.serviceCategory.getCategories().subscribe(category => this.categories = category);
        if (!isEmptyObject(this.data)) {
            this.isReading = true;
            this.isDisabledField = true;
            // this.address = Object.assign(this.address, this.data.address);
            // this.selectedCategory = Object.assign(this.selectedCategory, this.data.category);
            this.place = Object.assign(this.place, this.data);
        }
    }

    submit(formPlace: NgForm, formAddress?: NgForm) {

        // if (this.isReading) {
        //     this.servicePlace.updatePlace({...formPlace.value, id: this.place.id}).subscribe(
        //         (place) => {
        //             this.dialogRef.close(place?.message);
        //         },
        //         (err) => {
        //             this.dialogRef.close(err);
        //         }
        //     );
        // } else {
        //     this.serviceAddress.createAddress(formAddress?.value)
        //         .pipe(
        //             switchMap((value: any) => this.servicePlace.createPlaces(formPlace.value, value))
        //         )
        //         .subscribe(
        //             (place) => {
        //                 this.dialogRef.close(place?.message);
        //             },
        //             (err) => {
        //                 this.dialogRef.close(err);
        //             }
        //         );
        // }

        console.log(this.place, this.address)
    }

    selectAddress(address: Address) {
        this.address = address;
    }

    reading(): void {
        this.isDisabledField = false;
    }

    deleting(): void {
        this.servicePlace.deletePlace(this.place.id).subscribe(
            (place) => {
                this.dialogRef.close(place?.message);
            },
            (err) => {
                this.dialogRef.close(err);
            }
        );
    }

    close(): void {
        this.dialogRef.close();
    }

    cancel(): void {
        if (!this.isReading) return this.dialogRef.close('Отменено');
        this.isDisabledField = true;
    }
}
import { Component, Inject, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { switchMap } from "rxjs/operators";
import { AddressService } from "src/app/shared/services/address.service";
import { CategoryService } from "src/app/shared/services/category.service";
import { Address } from "src/app/shared/interface";
import { PlaceService } from "src/app/shared/services/places.service";
import { EventsForm } from "src/app/admin/shared/interface";
import { isEmptyObject } from "src/app/admin/shared/utils";

@Component({
    selector: 'dialog-address',
    templateUrl: 'address-form.component.html',
    styleUrls: ['address-form.component.scss']
})
export class DialogAddressComponent implements OnInit, EventsForm {

    isDisabledField!: boolean;
    isReading!: boolean;

    address: Address = {
        id: null,
        country: '',
        region: '',
        city: '',
        street: '',
        house: '',
        latitude: '',
        longitude: ''
    };

    constructor(
        public dialogRef: MatDialogRef<DialogAddressComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Address,
        private serviceAddress: AddressService
    ) { }

    ngOnInit(): void {
        this.address = Object.assign(this.address, this.data);
        if(!isEmptyObject(this.data)){
            this.isReading = true;
            this.isDisabledField = true;
        }
    }
    submit(formAddress: NgForm) {
        // this.serviceAddress.createAddress(formAddress.value)
        //     .pipe(
        //         switchMap((value) => this.servicePlace.createPlaces(formPlace.value, value))
        //     )
        //     .subscribe(
        //         (placeId) => console.log(placeId),
        //         (err) => console.log(err)
        //     );
    }

    reading(): void { 
        this.isDisabledField= false;
    }

    deleting(): void {

    }

    close(): void {
        this.dialogRef.close();
    }
}
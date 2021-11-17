import { Component, Inject, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddressService } from "src/app/shared/services/address.service";
import { Address } from "src/app/shared/interface";
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
        if (!isEmptyObject(this.data)) {
            this.isReading = true;
            this.isDisabledField = true;
        }
    }
    submit(formAddress: NgForm) {
        if (this.isReading) {
            this.serviceAddress.updateAddress({id: this.address.id, ...formAddress.value}).subscribe(
                (address) =>  this.dialogRef.close(address?.message),
                (err) =>  this.dialogRef.close(err)
            );
        } else {
            this.serviceAddress.createAddress(formAddress.value)
                .subscribe(
                    (address) => this.dialogRef.close(address),
                    (err) =>  this.dialogRef.close(err)
                );
        }
    }

    reading(): void {
        this.isDisabledField = false;
    }

    deleting(): void {
        this.serviceAddress.deleteAddress(this.address.id).subscribe(
            (address) => this.dialogRef.close(address?.message),
            (err) => this.dialogRef.close(err)
        );
    }

    close(): void {
        this.dialogRef.close();
    }

    cancel(): void {
        this.isDisabledField = true;
    }
}
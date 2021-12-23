import { Component, Inject, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddressService } from "src/app/shared/services/address.service";
import { Address, Place } from "src/app/shared/interface";
import { EventsForm } from "src/app/admin/shared/interface";
import { isEmptyObject } from "src/app/admin/shared/utils";
import { ConfirmDialogService } from "src/app/admin/shared/components/confirm/confirm.service";
import { Router } from "@angular/router";

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
        latitude: null,
        longitude: null
    };

    places: Place[] = [];

    constructor(
        public dialogRef: MatDialogRef<DialogAddressComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Address,
        private serviceAddress: AddressService,
        private confirmDialog: ConfirmDialogService,
        private route: Router
    ) { }

    ngOnInit(): void {
        this.address = Object.assign(this.address, this.data);
        this.places = this.data && this.data.places || [];

        if (!isEmptyObject(this.data)) {
            this.isReading = true;
            this.isDisabledField = true;
        }
    }
    submit(formAddress: NgForm) {
        if (this.isReading) {
            this.serviceAddress.updateAddress({ id: this.address.id, ...formAddress.value }).subscribe(
                (address) => this.dialogRef.close(address?.message),
                (err) => this.dialogRef.close(err)
            );
        } else {
            this.serviceAddress.createAddress(formAddress.value)
                .subscribe(
                    (address) => this.dialogRef.close(address),
                    (err) => this.dialogRef.close(err)
                );
        }
    }

    reading(): void {
        this.isDisabledField = false;
    }

    deleting(): void {
        this.confirmDialog.confirm('Хотите удалить запись?', 'Да', 'Нет').afterClosed().subscribe(
            result => {
                if (result) {
                    this.serviceAddress.deleteAddress(this.address.id).subscribe(
                        (address) => this.dialogRef.close(address?.message),
                        (err) => this.dialogRef.close(err)
                    );
                }
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

    goPlacePage(name: string):void {
        const url = this.route.createUrlTree(['/place', name]);
        window.open(url.toString(), '_blank');
    }
}
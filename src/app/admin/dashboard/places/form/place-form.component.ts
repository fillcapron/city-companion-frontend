import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddressService } from "src/app/shared/services/address.service";
import { CategoryService } from "src/app/shared/services/category.service";
import { Address, Categories, Place } from "src/app/shared/interface";
import { PlaceService } from "src/app/shared/services/places.service";
import { EventsForm, Images } from "src/app/admin/shared/interface";
import { isEmptyObject } from "src/app/admin/shared/utils";
import { switchMap } from "rxjs/operators";
import { ImagesService } from "src/app/shared/services/images.service";
import { ConfirmDialogService } from "src/app/admin/shared/components/confirm/confirm.service";
@Component({
    selector: 'dialog-places',
    templateUrl: 'place-form.component.html',
    styleUrls: ['place-form.component.scss']
})
export class DialogPlaceComponent implements OnInit, EventsForm {

    isReading!: boolean;
    isDisabledField!: boolean;
    addAddress!: boolean;

    categories: Categories[] = [];
    images: Images[] = [];

    address: Address = {
        id: null,
        country: '',
        region: '',
        city: '',
        street: '',
        house: ''
    };

    place: Place = {
        id: null,
        name: "",
        rating: "",
        website: "",
        description: "",
        published: false,
        images: [],
        category: {
            id: null,
            name: ''
        },
        address: this.address
    }

    constructor(
        public dialogRef: MatDialogRef<DialogPlaceComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Place,
        private serviceCategory: CategoryService,
        private serviceAddress: AddressService,
        private servicePlace: PlaceService,
        private serviceImages: ImagesService,
        private confirmDialog: ConfirmDialogService
    ) { }

    compareFn(c1: Categories, c2: Categories): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    ngOnInit(): void {
        if (!isEmptyObject(this.data)) {
            this.isReading = true;
            this.isDisabledField = true;
            this.place = Object.assign(this.place, this.data);
            this.address = Object.assign(this.address, this.data.address);
        }
        this.serviceCategory.getCategories().subscribe(category => this.categories = category);
    }

    submit(formPlace: NgForm): void {

        if (this.isReading) {
            this.servicePlace.updatePlace({ ...formPlace.value, id: this.place.id }).subscribe(
                (place) => {
                    if (this.images.length) {
                        this.images.map(elem => elem.place = place.meta.id);
                    }
                    this.dialogRef.close(place?.message);
                },
                (err) => {
                    this.dialogRef.close(err);
                }
            );
            return;
        }
        if (this.address.id) {
            this.servicePlace.createPlaces({ ...this.place, ...formPlace.value }).pipe(
                switchMap((place) => {
                    if (this.images.length) {
                        this.images.map(elem => elem.place = place.meta.id);
                    }
                    return this.serviceImages.create(this.images);
                })
            ).subscribe(
                (place) => {
                    this.dialogRef.close(place?.message);
                },
                (err) => {
                    this.dialogRef.close(err);
                }
            )
        } else {
            this.serviceAddress.createAddress(this.address)
                .pipe(
                    switchMap((value) => {
                        return this.servicePlace.createPlaces({ ...formPlace.value, address: value });
                    }),
                    switchMap((place) => {
                        if (this.images.length) {
                            this.images.map(elem => elem.place = place.meta.id);
                        }
                        return this.serviceImages.create(this.images);
                    })
                )
                .subscribe(
                    (place) => {
                        this.dialogRef.close(place?.message);
                    },
                    (err) => {
                        this.dialogRef.close(err);
                    }
                );
        }
    }

    selectAddress(address: Address): void {
        this.place.address = address;
        this.address = address;
    }

    uploadImage(images: any): void {
        if (this.isReading) {
            images.place = this.place.id;
            this.serviceImages.create([images]).subscribe(
                res => console.log(res),
                err => console.log(err)
            );
        }
        this.images.push(images);
    }

    reading(): void {
        this.isDisabledField = false;
    }

    deleting(): void {
        this.confirmDialog.confirm('Хотите удалить запись?', 'Да', 'Нет').afterClosed().subscribe(
            result => {
                if (result) {
                    this.servicePlace.deletePlace(this.place.id).subscribe(
                        (place) => {
                            this.dialogRef.close(place?.message);
                        },
                        (err) => {
                            this.dialogRef.close(err);
                        }
                    );
                }
            })
    }

    close(): void {
        this.dialogRef.close();
    }

    cancel(): void {
        if (!this.isReading) return this.dialogRef.close('Отменено');
        this.isDisabledField = true;
    }
}
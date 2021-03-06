import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddressService } from "src/app/shared/services/address.service";
import { CategoryService } from "src/app/shared/services/category.service";
import { Address, Categories, Place, Tags } from "src/app/shared/interface";
import { PlaceService } from "src/app/shared/services/places.service";
import { ApiResponse, EventsForm, Images, Tag } from "src/app/admin/shared/interface";
import { isEmptyObject } from "src/app/admin/shared/utils";
import { mergeMap, switchMap } from "rxjs/operators";
import { ImagesService } from "src/app/shared/services/images.service";
import { ConfirmDialogService } from "src/app/admin/shared/components/confirm/confirm.service";
import { TagService } from "src/app/admin/shared/services/tag.service";
import { forkJoin, Observable } from "rxjs";
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
    tags: Tag[] = [];

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
        rating: null,
        website: "",
        description: "",
        published: false,
        phone: "",
        category: {
            id: null,
            name: ""
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
        private confirmDialog: ConfirmDialogService,
        private serviceTag: TagService
    ) { }

    compareFn(c1: Categories, c2: Categories): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    ngOnInit(): void {
        if (!isEmptyObject(this.data)) {
            const { address, images, tags, reviews, ...place } = this.data;
            this.images = images || [];
            this.place = Object.assign(this.place, place);
            this.address = Object.assign(this.address, address);
            this.tags = tags || [];
            this.isReading = true;
            this.isDisabledField = true;
        }
        this.serviceCategory.getCategories().subscribe(category => this.categories = category);
    }
    onPublished(): void {
        if (!this.place.id) return;
        this.servicePlace.changePublished(this.place.id, { isPublished: this.place.published }).subscribe(
            (place) => this.dialogRef.close('???????????? ????????????????????????'),
            (err) => this.dialogRef.close(err)
        );
    }
    submit(): void {

        if (this.isReading) {
            this.servicePlace.updatePlace(this.place).subscribe(
                (place) => this.dialogRef.close(place?.message),
                (err) => this.dialogRef.close(err)
            );
            return;
        }
        if (this.address.id) {
            this.servicePlace.createPlaces({ ...this.place }).pipe(
                switchMap((place) => {
                    return forkJoin([this.createImages(place), this.createTags(place)]);
                })
            ).subscribe(
                (result) => {
                    if (result.every(el => Boolean(el.error))) {
                        this.dialogRef.close('?????????? ??????????????');
                        return;
                    }
                    return this.dialogRef.close('???????????? ????????????????');
                },
                (err) => {
                    this.dialogRef.close(err);
                }
            )
        } else {
            this.serviceAddress.createAddress(this.address)
                .pipe(
                    switchMap((value) => {
                        this.place.address = value.meta;
                        return this.servicePlace.createPlaces(this.place);
                    }),
                    switchMap((place) => {
                        return forkJoin([this.createImages(place), this.createTags(place)]);
                    })
                )
                .subscribe(
                    (result) => {
                        if (result.every(el => Boolean(el.error))) {
                            this.dialogRef.close('?????????? ??????????????');
                            return;
                        }
                        return this.dialogRef.close('???????????? ????????????????');
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
        this.confirmDialog.confirm('???????????? ?????????????? ?????????????', '????', '??????').afterClosed().subscribe(
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
        if (!this.isReading) return this.dialogRef.close('????????????????');
        this.isDisabledField = true;
    }

    private createTags(place: ApiResponse): Observable<ApiResponse> {
        if (this.tags?.length) {
            this.tags.map(elem => {
                elem.place = place.meta.id;
            });
        }
        return this.serviceTag.createTags(this.tags!);
    }

    private createImages(place: ApiResponse): Observable<ApiResponse> {
        if (this.images.length) {
            this.images.map(elem => elem.place = place.meta.id);
        }
        return this.serviceImages.create(this.images);
    }
}
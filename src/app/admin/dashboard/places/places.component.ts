import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Place } from 'src/app/shared/interface';
import { PlaceService } from 'src/app/shared/services/places.service';
import { DialogPlaceComponent } from './form/place-form.component';

@Component({
    selector: 'table-address',
    styleUrls: ['../../shared/components/tables/tables.component.scss'],
    templateUrl: '../../shared/components/tables/tables.component.html'
})
export class TableGeneratedColumnsPlaces implements OnInit {

    isLoaded: boolean = false;

    columns = [
        {
            columnDef: 'id',
            header: 'ID',
            cell: (element: Place) => `${element.id}`,
        },
        {
            columnDef: 'name',
            header: 'Название',
            cell: (element: Place) => `${element.name}`,
        },
        {
            columnDef: 'description',
            header: 'Описание',
            cell: (element: Place) => `${element.description.slice(0, 50)}...`,
        },
        {
            columnDef: 'category',
            header: 'Категория',
            cell: (element: Place) => `${element.category.name}`,
        },
        {
            columnDef: 'address',
            header: 'Адресс',
            cell: (element: any) => `${element.address?.city + ' ' + element.address?.street + ' ' + element.address?.house}`,
        },
        {
            columnDef: 'images',
            header: 'Изображения',
            cell: (element: Place) => `${element.images?.length}`,
        },
        {
            columnDef: 'tags',
            header: 'Теги',
            cell: (element: Place) => `${element.tags}`,
        }
    ];

    @ViewChild(MatPaginator, { static: false }) set paginator(value: MatPaginator) {
        if (this.data) {
            this.data.paginator = value;
        }
    }

    data = new MatTableDataSource<Place>();
    displayedColumns = this.columns.map(c => c.columnDef);

    constructor(
        private placeService: PlaceService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar) { }

    ngOnInit() {
        this.placeService.getPlaces().subscribe(places => {
            this.data.data = places;
            this.isLoaded = true;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.data.filter = filterValue.trim().toLowerCase();
    }

    openFormDialog(elem: string | object): void {

        const dialogRef = this.dialog.open(DialogPlaceComponent, {
            maxWidth: '900px',
            position: {top: '10px'},
            data: elem === 'add' ? {} : elem
        });

        dialogRef.afterClosed().subscribe(message => {

            if (message) {
                this._snackBar.open(message, 'Закрыть', {
                    duration: 3000,
                });
            }

            this.placeService.getPlaces().subscribe(places => {
                this.data.data = places;
            });
        });
    }
}
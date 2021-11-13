import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
            cell: (element: Place) => `${element.description}`,
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
            columnDef: 'rating',
            header: 'Рейтинг',
            cell: (element: Place) => `${element.rating}`,
        },
        {
            columnDef: 'images',
            header: 'Изображения',
            cell: (element: Place) => `${element.images}`,
        },
        {
            columnDef: 'tags',
            header: 'Теги',
            cell: (element: Place) => `${element.tags}`,
        },
        {
            columnDef: 'website',
            header: 'Вебсайт',
            cell: (element: Place) => `${element.website}`,
        }
    ];
    data = new MatTableDataSource<Place>();
    displayedColumns = this.columns.map(c => c.columnDef);

    constructor(
        private placeService: PlaceService,
        public dialog: MatDialog) { }

    ngOnInit() {
        this.placeService.getPlaces().subscribe(places => {
            this.data.data = places;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.data.filter = filterValue.trim().toLowerCase();
    }

    openFormDialog(elem: string | object): void {

        const dialogRef = this.dialog.open(DialogPlaceComponent, {
            width: '700px',
            data: elem === 'add' ? {} : elem
        });

        dialogRef.afterClosed().subscribe(result => {
            this.placeService.getPlaces().subscribe(places => {
                this.data.data = places;
            });
        });
    }
}
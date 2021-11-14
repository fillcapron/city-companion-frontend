import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddressService } from 'src/app/shared/services/address.service';
import { Address } from 'src/app/shared/interface';
import { DialogAddressComponent } from './form/address-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-table-address',
    styleUrls: ['../../shared/components/tables/tables.component.scss'],
    templateUrl: '../../shared/components/tables/tables.component.html'
})
export class TableGeneratedColumnsAddress implements OnInit {

    columns = [
        {
            columnDef: 'index',
            header: 'ID',
            cell: (element: Address) => `${element.id}`,
        },
        {
            columnDef: 'country',
            header: 'Страна',
            cell: (element: Address) => `${element.country}`,
        },
        {
            columnDef: 'region',
            header: 'Область',
            cell: (element: Address) => `${element.region}`,
        },
        {
            columnDef: 'city',
            header: 'Город',
            cell: (element: Address) => `${element.city}`,
        },
        {
            columnDef: 'street',
            header: 'Улица',
            cell: (element: Address) => `${element.street}`,
        },
        {
            columnDef: 'house',
            header: 'Дом',
            cell: (element: Address) => `${element.house}`,
        },
        {
            columnDef: 'latitude',
            header: 'Долгота',
            cell: (element: Address) => `${element.latitude}`,
        },
        {
            columnDef: 'longitude',
            header: 'Широта',
            cell: (element: Address) => `${element.longitude}`,
        },
    ];

    @ViewChild(MatPaginator, { static: false }) set paginator(value: MatPaginator) {
        if (this.data) {
            this.data.paginator = value;
        }
    }

    data = new MatTableDataSource();
    displayedColumns = this.columns.map(c => c.columnDef);

    constructor(private addressService: AddressService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

    ngOnInit() {
        this.addressService.getAllAddress().subscribe(result => {
            this.data.data = result;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.data.filter = filterValue.trim().toLowerCase();
    }

    openFormDialog(elem: string) {
        const dialogRef = this.dialog.open(DialogAddressComponent, {
            width: '700px',
            // height: '100%',
            // position: { right: '0px' },
            data: elem === 'add' ? {} : elem
        });

        dialogRef.afterClosed().subscribe(message => {

            if (message) {
                this._snackBar.open(message, 'Закрыть', {
                    duration: 3000,
                });
            }

            this.addressService.getAllAddress().subscribe(result => {
                this.data.data = result;
            });
        });
    }
}
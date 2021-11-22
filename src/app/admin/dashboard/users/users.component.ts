import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../shared/interface';
import { UserService } from '../../shared/services/user.service';
import { DialogUserComponent } from './form/user-form.component';

@Component({
    selector: 'app-table-address',
      styleUrls: ['../../shared/components/tables/tables.component.scss'],
      templateUrl: '../../shared/components/tables/tables.component.html'
})
export class TableGeneratedColumnsUsers implements OnInit {

    isLoaded: boolean = false;

    columns = [
        {
            columnDef: 'index',
            header: 'ID',
            cell: (element: User) => `${element.id}`,
        },
        {
            columnDef: 'name',
            header: 'Имя',
            cell: (element: User) => `${element.name}`,
        },
        {
            columnDef: 'email',
            header: 'Email',
            cell: (element: User) => `${element.email}`,
        }
    ];

    @ViewChild(MatPaginator, { static: false }) set paginator(value: MatPaginator) {
        if (this.data) {
            this.data.paginator = value;
        }
    }

    data = new MatTableDataSource<User>();
    displayedColumns = this.columns.map(c => c.columnDef);

    constructor(private userService: UserService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

    ngOnInit() {
        this.userService.getUsers().subscribe(users => {
            this.data.data = users;
            this.isLoaded = true;
        });
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.data.filter = filterValue.trim().toLowerCase();
    }

    openFormDialog(elem: string | object): void {

        const dialogRef = this.dialog.open(DialogUserComponent, {
            width: '700px',
            data: elem === 'add' ? {} : elem
        });

        dialogRef.afterClosed().subscribe(message => {

            if (message) {
                this._snackBar.open(message, 'Закрыть', {
                    duration: 3000,
                });
            }

            this.userService.getUsers().subscribe(users => {
                this.data.data = users;
            });
        });
    }
}
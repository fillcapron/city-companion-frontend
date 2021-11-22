import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Categories } from 'src/app/shared/interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogCategoryComponent } from './form/category-form.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-table-categories',
    styleUrls: ['../../shared/components/tables/tables.component.scss'],
    templateUrl: '../../shared/components/tables/tables.component.html',
})
export class TableGeneratedColumnsCategories implements OnInit {

    isLoaded: boolean = false;

    category: Categories = {
        id: null,
        name: ''
    };

    columns = [
        {
            columnDef: 'index',
            header: 'ID',
            cell: (element: Categories) => `${element.id}`,
        },
        {
            columnDef: 'name',
            header: 'Название',
            cell: (element: Categories) => `${element.name}`,
        }
    ];

    @ViewChild(MatPaginator, { static: false }) set paginator(value: MatPaginator) {
        if (this.data) {
            this.data.paginator = value;
        }
    }

    data = new MatTableDataSource<Categories>();
    displayedColumns = this.columns.map(c => c.columnDef);

    constructor(private categoryService: CategoryService,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar) { }

    ngOnInit() {
        this.categoryService.getCategories().subscribe((categories) => {
            this.data.data = categories;
            this.isLoaded = true;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.data.filter = filterValue.trim().toLowerCase();
    }

    openFormDialog(elem: string) {
        const dialogRef = this.dialog.open(DialogCategoryComponent, {
            width: '700px',
            data: elem === 'add' ? {} : elem
        });

        dialogRef.afterClosed().subscribe((message) => {

            if (message) {
                this._snackBar.open(message, 'Закрыть', {
                    duration: 3000,
                });
            }
            const res = this.categoryService.getCategories().subscribe((categories) => {
                this.data.data = categories;
            });
        });
    }
}
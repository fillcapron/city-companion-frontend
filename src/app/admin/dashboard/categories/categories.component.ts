import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Categories } from 'src/app/shared/interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogCategoryComponent } from './form/category-form.component';

@Component({
    selector: 'app-table-categories',
    styleUrls: ['../../shared/components/tables/tables.component.scss'],
    templateUrl: '../../shared/components/tables/tables.component.html',
})
export class TableGeneratedColumnsCategories implements OnInit {

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

    data = new MatTableDataSource();
    displayedColumns = this.columns.map(c => c.columnDef);

    constructor(private categoryService: CategoryService,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.categoryService.getCategories().subscribe(categories => {
            this.data.data = categories;
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

        dialogRef.afterClosed().subscribe(() => {
            const res = this.categoryService.getCategories().subscribe((categories) => {
                this.data.data = categories;
            });
        });
    }
}
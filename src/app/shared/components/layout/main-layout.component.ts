import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Categories } from "../../interface";
import { CategoryService } from "../../services/category.service";

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
    
    categories!: Categories[];
    showCategoriesList: boolean = false;
    constructor(private categoryService: CategoryService, private router: Router) { }

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }

    onShowCategories(): void {
        this.showCategoriesList = !this.showCategoriesList;
    }

    onCloseModal(e: any): void {
        console.log('click')
        if(e.target.id === 'modal'){
            this.showCategoriesList = !this.showCategoriesList;
        }
    }

    goCategories(name: string): void {
        this.router.navigate(['/categories', name]);
        this.showCategoriesList = !this.showCategoriesList;
    }
}
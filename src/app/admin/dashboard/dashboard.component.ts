import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { NavigationStart, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { toArray } from "rxjs/operators";
import { AddressService } from "src/app/shared/services/address.service";
import { CategoryService } from "src/app/shared/services/category.service";
import { PlaceService } from "src/app/shared/services/places.service";
import { NavMenu } from "../shared/interface";
import { menu } from "../shared/menu";
import { UserService } from "../shared/services/user.service";

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    menu: NavMenu[] = menu;
    userName!: string;
    hide: boolean = false;
    totals!: any[];
    constructor(
        private title: Title,
        private router: Router,
        private userService: UserService,
        private addressService: AddressService,
        private categoryService: CategoryService,
        private placeService: PlaceService) { }

    ngOnInit(): void {
        this.title.setTitle('Административная панель');
        this.userName = localStorage.getItem('profile')!;
        this.checkHome();
        this.getTotals();
    }

    private checkHome(): void {
        if (this.router.url === '/admin/dashboard') {
            this.hide = true;
        }
        this.router.events.subscribe(ev => {
            if (ev instanceof NavigationStart) {
                this.hide = ev.url === '/admin/dashboard' ? true : false;
            }
        })
    }

    private getTotals(): void {
        const services = [this.userService.totalUsers(), this.addressService.totalAddress(), this.categoryService.totalCategories(), this.placeService.totalPlaces()];
        forkJoin(services).subscribe(x => this.totals = x);
    }
}
import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { NavMenu } from "../shared/interface";
import { menu } from "../shared/menu";

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    menu: NavMenu[] = menu;
    constructor(private title: Title){ 
        title.setTitle('Административная панель')
    }
 }
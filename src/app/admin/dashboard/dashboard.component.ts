import { Component, OnInit } from "@angular/core";
import { NavMenu } from "../shared/interface";
import { menu } from "../shared/menu";

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    menu: NavMenu[] = menu;
 }
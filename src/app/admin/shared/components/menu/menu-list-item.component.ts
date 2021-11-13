import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { NavMenu } from "../../interface";

@Component({
    selector: 'app-menu-list',
    templateUrl: './menu-list-item.component.html',
    styleUrls: ['./menu-list-item.component.scss']
})
export class MenuListItemComponent {

    @Input() menu!: NavMenu[];

    constructor( public router: Router) { }
}
import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
    
    constructor(public readonly authService: AuthService) { }

    logout(): void {
        this.authService.logout()
    }
}
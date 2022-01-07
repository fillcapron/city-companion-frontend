import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly auth: AuthService,
        private readonly router: Router) { }

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['/admin', 'login']);
        }

        return true;
    }
}
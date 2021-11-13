import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";

@Component({
    selector: 'app-admin-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    hide: boolean = true;

    authForm: FormGroup = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email,
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
        ]
        )
    });

    constructor(private readonly Router: Router, private readonly authService: AuthService) { }

    ngOnInit() {
        Promise.resolve().then(() => localStorage.removeItem('access_token'));
    }

    login() {

        if (this.authForm.invalid) {
            return
        }

        const user = {
            email: this.authForm.value.email,
            password: this.authForm.value.password
        }

        this.authService.login(user).subscribe(res => {

            if (res.token) {
                this.Router.navigate(['/admin', 'dashboard'])
            }

        }, err => {
            alert(err.error?.message);
        });
    }
}
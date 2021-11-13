import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AUTH_API_URL } from "../../admin-injection-tokens";
import { AuthToken, User } from "../interface";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

export const ACCESS_TOKEN_KEY = 'access_token';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private readonly http: HttpClient,
        private readonly jwtHelper: JwtHelperService,
        @Inject(AUTH_API_URL) private url: string,
        private readonly router: Router
        ) {}


    login(userDto: User): Observable<AuthToken> {
        return this.http.post<AuthToken>(this.url + 'login', userDto).pipe(
            tap(token => {
                localStorage.setItem(ACCESS_TOKEN_KEY, token.token)
            })
        );
    }

    registration(userDto: User): Observable<User> {
        return this.http.post<User>(this.url + 'registration', userDto);
    }

    isAuthenticated(): boolean | string | null {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        return token && !this.jwtHelper.isTokenExpired(token);
        
    }

    logout(): void {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        this.router.navigate(['/admin', 'login']);
    }
}
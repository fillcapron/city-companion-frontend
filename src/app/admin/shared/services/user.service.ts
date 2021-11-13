import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interface";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class UserService {

    url: string = 'https://city-companion.herokuapp.com/users/';

    constructor( private http: HttpClient, private auth: AuthService) { }

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>(this.url);
    }

    createUser(user: User): Observable<User>{
        return this.auth.registration(user);
    }

    deleteUser(id: number | null): Observable<{}>{
        return this.http.delete(this.url + id);
    }

    updateUser(user: User): Observable<User> {
        return this.http.patch<User>(this.url, user);
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersService {

    url: string = "https://city-companion.herokuapp.com/users/"
    constructor(private http: HttpClient){ }

    totalUsers(): Observable<{users: number}> {
        return this.http.get<{users: number}>(this.url + 'total/all');
    }
}
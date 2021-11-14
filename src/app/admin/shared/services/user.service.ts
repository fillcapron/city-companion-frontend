import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IMessage, User } from "../interface";
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

    deleteUser(id: number | null): Observable<IMessage>{
        return this.http.delete<IMessage>(this.url + id);
    }

    updateUser(user: User): Observable<IMessage> {
        return this.http.patch<IMessage>(this.url, user);
    }
}
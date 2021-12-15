import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "src/app/admin/shared/interface";
import { Reviews } from "../interface";

@Injectable({
    providedIn: 'root'
})
export class ReviewsService {

    url: string = "https://city-companion.herokuapp.com/reviews/";

    constructor(private http: HttpClient) { }

    create(review: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.url, review);
    }
}
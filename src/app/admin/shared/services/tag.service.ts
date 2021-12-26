import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse, Tag } from "../interface";

@Injectable({ providedIn: 'root' })
export class TagService {

    url: string = 'https://city-companion.herokuapp.com/tags/'

    constructor(private http: HttpClient) { }

    createTag(tag: Tag): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.url, tag);
    }

    deleteTag(id: number | undefined): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(this.url + id);
    }

    createTags(tags: Tag[]): Observable<any> {
        return this.http.post<any>(this.url + 'all/', tags);
    }

    getPlaceOrCategory(query: string): Observable<any> {
        return this.http.get<any>(this.url + 'search/' + query);
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from '../interface';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    url: string = 'https://city-companion.herokuapp.com/categories/'

    constructor(private http: HttpClient) { }

    public getCategories(): Observable<Categories[]> {
        return this.http.get<Categories[]>(this.url);
    }

    public createCategory(cat_name: string): Observable<Categories> {
        return this.http.post<Categories>(this.url, cat_name )
    }

    public deleteCategory(id: number | null): Observable<{}> {
        return this.http.delete(this.url + id );
    }

    public updateCategory(dto: Categories): Observable<Categories> {
        return this.http.patch<Categories>(this.url, dto);
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from '../interface';
import { ApiResponse } from 'src/app/admin/shared/interface';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    url: string = 'https://city-companion.herokuapp.com/categories/'

    constructor(private http: HttpClient) { }

    getCategories(): Observable<Categories[]> {
        return this.http.get<Categories[]>(this.url);
    }

    createCategory(cat_name: string): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.url, cat_name )
    }

    deleteCategory(id: number | null): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(this.url + id );
    }

    updateCategory(dto: Categories): Observable<ApiResponse> {
        return this.http.patch<ApiResponse>(this.url, dto);
    }
}
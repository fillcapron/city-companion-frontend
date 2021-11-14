import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from '../interface';
import { IMessage } from 'src/app/admin/shared/interface';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    url: string = 'https://city-companion.herokuapp.com/categories/'

    constructor(private http: HttpClient) { }

    public getCategories(): Observable<Categories[]> {
        return this.http.get<Categories[]>(this.url);
    }

    public createCategory(cat_name: string): Observable<IMessage> {
        return this.http.post<IMessage>(this.url, cat_name )
    }

    public deleteCategory(id: number | null): Observable<IMessage> {
        return this.http.delete<IMessage>(this.url + id );
    }

    public updateCategory(dto: Categories): Observable<IMessage> {
        return this.http.patch<IMessage>(this.url, dto);
    }
}
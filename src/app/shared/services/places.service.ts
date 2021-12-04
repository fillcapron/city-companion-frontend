import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address, Place } from '../interface';
import { ApiResponse } from 'src/app/admin/shared/interface';

@Injectable({
    providedIn: 'root',
})
export class PlaceService {
    url: string = 'https://city-companion.herokuapp.com/places/'

    constructor(private http: HttpClient) { }

    createPlaces(place: Place, address?: Address): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.url, place);
    }

    getPlaces(): Observable<Place[]> {
        return this.http.get<Place[]>(this.url);
    }

    getPlace(): Observable<Place> {
        return this.http.get<Place>(this.url);
    }

    updatePlace(place: Place): Observable<ApiResponse> {
        return this.http.patch<ApiResponse>(this.url, place);
    }

    deletePlace(id: number | null): Observable<ApiResponse>  {
        return this.http.delete<ApiResponse>(this.url + id);
    }

    getPlacesByCategory(categoryName: string): Observable<Place[]> {
        console.log(categoryName)
        return this.http.get<Place[]>(this.url + 'category/' + categoryName);
    }
}
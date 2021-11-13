import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address, Place } from '../interface';

@Injectable({
    providedIn: 'root',
})
export class PlaceService {
    url: string = 'https://city-companion.herokuapp.com/places/'

    constructor(private http: HttpClient) { }

    createPlaces(place: Place, address: Address): Observable<Place> {
        place.address = address;
        return this.http.post<Place>(this.url, place);
    }

    getPlaces(): Observable<Place[]> {
        return this.http.get<Place[]>(this.url);
    }

    getPlace(): Observable<Place> {
        return this.http.get<Place>(this.url);
    }

    updatePlace(place: Place): Observable<Place> {
        return this.http.patch<Place>(this.url, place);
    }

    deletePlace(id: number | null): Observable<Place>  {
        return this.http.delete<Place>(this.url + id);
    }
}
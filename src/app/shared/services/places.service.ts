import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address, Place } from '../interface';
import { IMessage } from 'src/app/admin/shared/interface';

@Injectable({
    providedIn: 'root',
})
export class PlaceService {
    url: string = 'https://city-companion.herokuapp.com/places/'

    constructor(private http: HttpClient) { }

    createPlaces(place: Place, address: Address): Observable<IMessage> {
        place.address = address;
        return this.http.post<IMessage>(this.url, place);
    }

    getPlaces(): Observable<Place[]> {
        return this.http.get<Place[]>(this.url);
    }

    getPlace(): Observable<Place> {
        return this.http.get<Place>(this.url);
    }

    updatePlace(place: Place): Observable<IMessage> {
        return this.http.patch<IMessage>(this.url, place);
    }

    deletePlace(id: number | null): Observable<IMessage>  {
        return this.http.delete<IMessage>(this.url + id);
    }
}
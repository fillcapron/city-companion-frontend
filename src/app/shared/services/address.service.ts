import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../interface';

@Injectable({
    providedIn: 'root',
})
export class AddressService {
    url: string = 'https://city-companion.herokuapp.com/address/'
    
    constructor(private http: HttpClient) { }

    public createAddress(address: Address): Observable<number> {
        return this.http.post<number>(this.url, address);
    }

    public getAddressId(address: Address): Observable<Address>{
        return this.http.post<Address>(this.url, address)
    }

    public getAllAddress(): Observable<Address[]>{
        return this.http.get<Address[]>(this.url)
    }
}
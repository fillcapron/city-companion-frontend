import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../interface';
import { IMessage } from 'src/app/admin/shared/interface';

@Injectable({
    providedIn: 'root',
})
export class AddressService {
    url: string = 'https://city-companion.herokuapp.com/address/'
    
    constructor(private http: HttpClient) { }

    createAddress(address: Address): Observable<IMessage> {
        return this.http.post<IMessage>(this.url, address);
    }

    getAddressId(address: Address): Observable<Address>{
        return this.http.post<Address>(this.url, address)
    }

    getAllAddress(): Observable<Address[]>{
        return this.http.get<Address[]>(this.url)
    }

    deleteAddress(id: number | null): Observable<IMessage>{
        return this.http.delete<IMessage>(this.url + id);
    } 

    updateAddress(address: Address): Observable<IMessage>{
        return this.http.patch<IMessage>(this.url, address);
    }
}
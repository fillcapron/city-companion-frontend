import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../interface';
import { ApiResponse } from 'src/app/admin/shared/interface';

@Injectable({
    providedIn: 'root',
})
export class AddressService {
    url: string = 'https://city-companion.herokuapp.com/address/'
    
    constructor(private http: HttpClient) { }

    createAddress(address: Address): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.url, address);
    }

    getAddressId(address: Address): Observable<Address>{
        return this.http.post<Address>(this.url, address)
    }

    getAllAddress(): Observable<Address[]>{
        return this.http.get<Address[]>(this.url)
    }

    deleteAddress(id: number | null): Observable<ApiResponse>{
        return this.http.delete<ApiResponse>(this.url + id);
    } 

    updateAddress(address: Address): Observable<ApiResponse>{
        return this.http.patch<ApiResponse>(this.url, address);
    }

    totalAddress(): Observable<{address: number}>{
        return this.http.get<{address: number}>(this.url + 'total/all');
    }
}
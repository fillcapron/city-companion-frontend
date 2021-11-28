import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Images } from "src/app/admin/shared/interface";

@Injectable({
    providedIn: 'root'
})
export class ImagesService {

    $images: Images[] = [];
    url: string = 'https://city-companion.herokuapp.com/images/';

    constructor(private http: HttpClient) {}

    upload(form: FormData): Observable<Images> {
        return this.http.post<Images>(this.url + 'upload', form);
    }
    
    create(images: Images[]): Observable<any> {
        return this.http.post<any>(this.url + 'save', images);
    }
}
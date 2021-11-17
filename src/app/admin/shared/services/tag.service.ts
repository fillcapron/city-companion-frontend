import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IMessage, Tag } from "../interface";

@Injectable({ providedIn: 'root' })
export class TagService {

    url: string = 'https://city-companion.herokuapp.com/tags'

    constructor(private http: HttpClient) { }

    createTag(tag: Tag): Observable<IMessage> {
        return this.http.post<IMessage>(this.url, tag);
    }

    deleteTag(id: number | undefined): Observable<IMessage> {
        return this.http.delete<IMessage>(`${this.url}/${id}`);
    }

    createTags(tags: Tag[]): Observable<any> {
        return this.http.post<any>(`${this.url}/all/`, tags);
    }
}
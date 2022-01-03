import { Images, Tag } from "../admin/shared/interface";

type CategoryOrPlace = {
    id: number,
    name: string
} 

export interface Tags {
    name: string
}
export interface Categories {
    id: number | null,
    name: string,
    tags?: Tag[]
}

export interface Place {
    [value: string]: any,
    id: number | null,
    name: string,
    address?: Address,
    description: string,
    category: Categories,
    tags?: Tag[],
    images?: Images[],
    reviews?: Reviews[],
    phone: string,
    rating: number | null,
    website: string,
    published: boolean,
    views?: number
}

export interface Address {
    id: number | null,
    country: string,
    region: string,
    city: string,
    street: string,
    house: string,
    latitude?: number | null,
    longitude?: number | null,
    places?: Place[]
}
export interface PlacemarkConstructor {
    geometry: number[];
    properties: ymaps.IPlacemarkProperties;
    options: ymaps.IPlacemarkOptions;
}

export interface Reviews {
    id?: number,
    author_name: string,
    review_text: string,
    rating_place: number,
    place: number
}

export interface SearchResult {
    id: number,
    category?: CategoryOrPlace,
    place?: CategoryOrPlace
}
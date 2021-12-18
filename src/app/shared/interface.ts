import { Images, Tag } from "../admin/shared/interface";

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
    rating: string,
    website: string,
    published: boolean
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
    place: number
}
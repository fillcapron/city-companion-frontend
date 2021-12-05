import { Images } from "../admin/shared/interface";

export interface Tags {
    name: string
}
export interface Categories {
    id: number | null,
    name: string,
    tags?: any[]
}

export interface Place {
    id: number | null,
    name: string,
    address?: Address,
    description: string,
    category: Categories,
    tags?: Tags[],
    images?: Images[],
    reviews?: string[],
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

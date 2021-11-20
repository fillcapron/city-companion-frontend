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
    address?: Address | number | null,
    description: string,
    category: Categories,
    tags?: string[],
    images?: string[],
    reviews?: string[],
    rating: string,
    website: string
}

export interface Address {
    id: number | null,
    country: string,
    region: string,
    city: string,
    street: string,
    house: string,
    latitude?: string,
    longitude?: string,
    places?: Place[]
}

import { NgForm } from "@angular/forms";

export interface User {
    id?: number | null,
    name?: string,
    email: string,
    password: string
}

export interface AuthToken {
    token: string,
    message?: string
}

export interface NavMenu {
    name: string,
    icon: string,
    route: string
}

export interface EventsForm {
    submit: (A: NgForm, B?: NgForm) => void,
    deleting: () => void,
    reading: () => void,
    close: () => void,
    cancel: () => void
}

export interface ApiResponse {
    message: string,
    error?: boolean,
    meta?: any
}

export interface Tag {
    id?: number,
    name: string,
    category?: number | null,
    place?: number | null
}

export interface Images {
    id?: number,
    place: string,
    url: string
}
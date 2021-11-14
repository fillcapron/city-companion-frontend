export interface User {
    id?: number | null,
    name?: string,
    email: string,
    password: string
}

export interface AuthToken {
    token: string
}

export interface NavMenu {
    name: string,
    icon: string,
    route: string
}

export interface EventsForm {
    submit: (T: any, R?: any) => void,
    deleting: () => void,
    reading: () => void,
    close: (T: any) => void
}

export interface IMessage {
    message: string,
    error?: boolean
}
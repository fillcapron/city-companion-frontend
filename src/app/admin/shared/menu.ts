import { NavMenu } from "./interface";

export const menu: NavMenu[] = [
    {
        name: 'Главная',
        icon: 'home',
        route: '../dashboard'
    },
    {
        name: 'Категории',
        icon: 'apps',
        route: 'Категории'
    },
    {
        name: 'Адреса',
        icon: 'location_on',
        route: 'Адреса'
    },
    {
        name: 'Места',
        icon: 'business',
        route: 'Места'
    },
    {
        name: 'Пользователи',
        icon: 'person',
        route: 'Пользователи'
    },
]
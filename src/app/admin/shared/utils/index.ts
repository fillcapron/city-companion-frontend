import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export function isEmptyObject(obj: {}): boolean {
    return JSON.stringify(obj) === '{}';
}

export function isEqual(object1: { [key: string]: any }, object2: { [key: string]: any }): boolean {
    const props1 = Object.getOwnPropertyNames(object1);
    const props2 = Object.getOwnPropertyNames(object2);

    if (props1.length !== props2.length) {
        return false;
    }

    for (let i = 0; i < props1.length; i += 1) {
        const prop = props1[i];
        const bothAreObjects = typeof (object1[prop]) === 'object' && typeof (object2[prop]) === 'object';

        if ((!bothAreObjects && (object1[prop] !== object2[prop]))
            || (bothAreObjects && !isEqual(object1[prop], object2[prop]))) {
            return false;
        }
    }

    return true;
}
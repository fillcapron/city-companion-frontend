import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(value: any, searchValue: string): any {
        if(!searchValue) return value;

        return value.filter((element: any) => element.name.toLowerCase().includes(searchValue.toLowerCase()));
    }
}
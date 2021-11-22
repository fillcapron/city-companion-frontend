import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Address } from "src/app/shared/interface";
import { AddressService } from "src/app/shared/services/address.service";

@Component({
    selector: 'address-search',
    templateUrl: './address-search.component.html',
    styleUrls: ['./address-search.component.scss']
})
export class AddressSearch implements OnInit {

    myControl = new FormControl();
    options!: Address[];
    filteredOptions!: Observable<Address[]>;
    @Output() selectAddressEvent = new EventEmitter();

    constructor(private _addressService: AddressService) { }

    ngOnInit(): void {
        this._addressService.getAllAddress().subscribe(
            res => this.options = res,
            err => alert(err)
        );
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => (typeof value === 'string' ? value : value.street)),
            map(name => (name ? this._filter(name) : this.options))
        );
    }

    private _filter(name: string): any {

        const filterValue = name.toLowerCase();
        const result = this.options.filter(option => option.street.toLowerCase().includes(filterValue));
        return result.length ? result : [{ street: 'Не найдено' }];
    }

    select(address: Address) {
        this.selectAddressEvent.emit(address);
    }

    displayFn(address: any): string {

        return address && address.city ? `г.${address.city} ${address.street} ${address.house}` : ''
    }

    _allowSelection({ street }: any): { [className: string]: boolean } {
        return {
            'no-data': street === 'Не найдено',
        }
    }

}
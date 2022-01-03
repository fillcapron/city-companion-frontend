import { coerceNumberProperty } from "@angular/cdk/coercion";
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export const RATING_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RatingComponent),
    multi: true,
};

export interface RatingChange {
    source: RatingComponent;
    value: number | null;
}

@Component({
    selector: 'rating',
    templateUrl: './rating.component.html',
    providers: [RATING_VALUE_ACCESSOR],
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements ControlValueAccessor{
    Array = Array;

    @Input() color!: string;
    @Input() disabled!: boolean;
    @Input() countStars!: number;
    @Input()
    get value(): number | null {
        if (this._value === null) {
            this.value = 0;
        }
        return this._value;
    }
    set value(num: number | null) {
        if (num !== this._value) {
            let value = coerceNumberProperty(num);

            if (this._roundToDecimal && value !== 0 && value !== this.countStars) {
                value = parseFloat(value.toFixed(this._roundToDecimal));
            }

            this._value = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    private _value: number | null = null;
    private _roundToDecimal: number = 1;

    @Output()
    readonly change: EventEmitter<RatingChange> = new EventEmitter<RatingChange>();
    readonly valueChange: EventEmitter<number | null> = new EventEmitter<
        number | null
    >();

    onTouched: () => any = () => { };
    private _cvaChangeFn: (value: any) => void = () => { };

    constructor(private _changeDetectorRef: ChangeDetectorRef) { }

    writeValue(value: any) {
        this.value = value;
    }

    registerOnChange(fn: (value: any) => void) {
        this._cvaChangeFn = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    onClick(index: number) {
        const newValue = index + 1;
        this.value = this.value === newValue ? index : newValue;
        this._emitChangeEvent();
    }

    getIcon(index: number) {
        const value = this.value || 0;

        if (index < value) {
            return 'star';
        }

        return 'star_border';
    }

    private _emitChangeEvent() {
        this._cvaChangeFn(this.value);
        this.valueChange.emit(this.value);
        this.change.emit({ source: this, value: this.value });
    }
}
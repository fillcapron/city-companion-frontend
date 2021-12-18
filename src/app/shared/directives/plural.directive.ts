import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
    selector: '[plural]'
})
export class PluralDirective implements OnChanges {

    @Input() variants: string[] = [];
    @Input() value!: number;

    constructor(private element: ElementRef) { }

    ngOnChanges(): void {
        this.element.nativeElement.textContent =
            this.value % 10 === 1 && this.value % 100 !== 11
                ? this.variants[0]
                : this.value % 10 >= 2 &&
                this.value % 10 <= 4 &&
                (this.value % 100 < 10 || this.value % 100 >= 20)
                ? this.variants[1]
                : this.variants[2];
    }
}
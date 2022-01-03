import { Component, Input } from "@angular/core";

@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

    @Input() Lwidth!: string;
    @Input() Lheight!: string;
    @Input() circle!: boolean;

    getStyles() {
        const styles = {
            'min-width.px': this.Lwidth ? this.Lwidth : '',
            'max-width.%': '100',
            'height.px': this.Lheight ? this.Lheight : '',
            'border-radius': this.circle ? '50%': ''
        }
        return styles;
    }
}
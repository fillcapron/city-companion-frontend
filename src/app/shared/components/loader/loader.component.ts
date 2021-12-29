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
            'width.px': this.Lwidth ? this.Lwidth : '',
            'height.px': this.Lheight ? this.Lheight : '',
            'border-radius': this.circle ? '50%': ''
        }
        return styles;
    }
}
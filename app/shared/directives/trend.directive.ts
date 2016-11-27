import { Directive, ElementRef, Input, Renderer, OnChanges } from '@angular/core';

/**
 * Directive: Adds the bootstrap 3 glyphicon-arrow-up, minus, or down class
 * to the element depending on the provided trend value. 
 *      positive numbers - glyphicon-arrow-up
 *      negative numbers - glyphicon-arrow-down
 *      zero numbers     - glyphicon-minus
 */
@Directive({ selector: '[trend]' })
export class TrendDirective implements OnChanges {

    @Input('trend') value: string;

    constructor(private renderer: Renderer, private el: ElementRef) { }

    ngOnChanges() {
        let numValue = parseFloat(this.value);
        if (numValue < 0) {
            this.renderer.setElementClass(
                this.el.nativeElement, 'glyphicon-arrow-up', false);
            this.renderer.setElementClass(
                this.el.nativeElement, 'glyphicon-minus', false);
            this.renderer.setElementClass(
                this.el.nativeElement, 'glyphicon-arrow-down', true);
        } else if (numValue > 0) {
            this.renderer.setElementClass(
                this.el.nativeElement, 'glyphicon-arrow-down', false);
            this.renderer.setElementClass(
                this.el.nativeElement, 'glyphicon-minus', false);
            this.renderer.setElementClass(
                this.el.nativeElement, 'glyphicon-arrow-up', true);
        } else {
            this.renderer.setElementClass(
                this.el.nativeElement, 'glyphicon-arrow-up', false);
            this.renderer.setElementClass(
                this.el.nativeElement, 'glyphicon-arrow-down', false);
            this.renderer.setElementClass(
                this.el.nativeElement, 'glyphicon-minus', true);
        }

    }
}

import { Directive, ElementRef, Input, Renderer, OnChanges, SimpleChange } from '@angular/core';

import { AppSettings } from '../../shared/config/settings';
/**
 * Directive: Adds 'highlight' the class of an element when a value changes
 * and is then removed after a specified time later. 'highlight' can be
 * specified in css to style this highlight.
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

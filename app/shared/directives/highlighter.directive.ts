import { Directive, ElementRef, Input, Renderer, OnChanges, SimpleChange } from '@angular/core';

/**
 * Directive: Adds 'highlight' to the class of an element when a value changes
 * and is then removed after a specified time later. 'highlight' can be
 * specified in css to style this highlight.
 */
@Directive({ selector: '[highlighter]' })
export class HighlighterDirective implements OnChanges {

    @Input('highlighter') value: number;
    private highlighterInterval = 2.5; // seconds
    constructor(
        private renderer: Renderer,
        private el: ElementRef
    ) { }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        let ov = changes['value']['previousValue'];
        let nv = changes['value']['currentValue'];
        if (nv !== ov && ov !== null) {
            this.renderer.setElementClass(
                this.el.nativeElement, 'highlight', true);
            setTimeout(() => {
                this.renderer.setElementClass(
                    this.el.nativeElement, 'highlight', false);
            }, this.highlighterInterval * 1000);
        }

    }
}

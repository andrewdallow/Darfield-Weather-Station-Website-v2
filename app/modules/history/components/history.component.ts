import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'history',
    template: '<router-outlet></router-outlet>'
})
/**
 * This class represents the lazy loaded HistoryComponent, a router-outlet
 * for the history module.
 */
export class HistoryComponent {
    constructor() { }
}

import { Component, AfterViewChecked } from '@angular/core';
/**
 * [Component description]
 */
@Component({
    moduleId: module.id,
    selector: 'google-ads',
    templateUrl: 'google-ads.component.html'
})
export class GoogleAdsComponent implements AfterViewChecked {
    constructor() {

    }
    ngAfterViewChecked(): void {
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) { }
    }
}

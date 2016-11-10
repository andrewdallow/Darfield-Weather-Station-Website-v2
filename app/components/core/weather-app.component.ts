import { Component } from '@angular/core';

import { AppSettings } from '../../config/settings';

@Component({
    moduleId: module.id,
    selector: 'weather-app',
    templateUrl: './weather-app-chrome.html'
})

export class WeatherAppComponent {
    // Collapsed Mobile Navigation
    public isCollapsed: boolean = true;
    public status: { isopen: boolean } = { isopen: false };
    public links: any = AppSettings.MAIN_NAVIGATION_LINKS;
    public stationName: string = AppSettings.SITE_NAME;

    /**
     * Toggles a dropdown menu when a specified link or button
     * is clicked. Relies on ng2-bootstrap.
     *@param $event Mouse click event when dropdown is clicked
     */
    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
        console.log(this.status.isopen);
    }

    public isDropdown(subLinks: Array<any>): boolean {
        if (subLinks.length !== 0) {
            console.log(subLinks);
            return true;
        }
        return false;
    }

}

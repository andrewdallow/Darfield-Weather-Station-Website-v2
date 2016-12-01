import { Component } from '@angular/core';

import { SettingsService } from '../../shared/config/settings.service';

@Component({
    moduleId: module.id,
    selector: 'weather-app',
    templateUrl: './weather-app-chrome.html'
})
/**
 * This class represents the lazy loaded WeatherAppComponent.
 */
export class WeatherAppComponent {
    // Collapsed Mobile Navigation
    public isCollapsed: boolean = true;
    public status: { isopen: boolean } = { isopen: false };
    public stationName: string;
    public social: any;

    constructor(private settingsService: SettingsService) {
        this.settingsService.config.then(
            (config: any) => {
                this.stationName = config.siteName;
                this.social = config.social;
            }
        );
    }

    /**
     * Toggles a dropdown menu when a specified link or button
     * is clicked. Relies on ng2-bootstrap.
     *@param $event Mouse click event when dropdown is clicked
     */
    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    public isDropdown(subLinks: Array<any>): boolean {
        if (subLinks.length !== 0) {
            return true;
        }
        return false;
    }

}

import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { WeatherDataService } from '../../../../../shared/weather-data/weather-data.service';
import { SettingsService } from '../../../../../shared/config/settings.service';


@Component({
    moduleId: module.id,
    selector: 'wind',
    templateUrl: './wind.component.html'
})

export class WindComponent {
    @Input() data: Observable<any>;
    public settings: any;

    constructor(
        private weatherDataService: WeatherDataService,
        private settingsService: SettingsService
    ) {
        this.settingsService.config.then(
            (_config: any) => {
                this.settings = _config;
            });
    }
}

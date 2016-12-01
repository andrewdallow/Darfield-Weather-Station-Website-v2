import { Component, Input } from '@angular/core';

import { WeatherDataService } from '../../../../../shared/weather-data/weather-data.service';
import { SettingsService } from '../../../../../shared/config/settings.service';

@Component({
    moduleId: module.id,
    selector: 'temperature',
    templateUrl: './temperature.component.html',
    providers: []
})

export class TemperatureComponent {
    @Input() data: any;
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

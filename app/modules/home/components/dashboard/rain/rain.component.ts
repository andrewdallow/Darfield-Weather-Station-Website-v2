import { Component, Input } from '@angular/core';

import { WeatherDataService } from '../../../../../shared/weather-data/weather-data.service';
import { SettingsService } from '../../../../../shared/config/settings.service';


@Component({
    moduleId: module.id,
    selector: 'rain',
    templateUrl: './rain.component.html'
})

export class RainComponent {
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

    getWeaterImg(): string {
        if (this.weatherDataService.getRealtimeData() === undefined) {
            return '';
        }
        return 'assets/img/' + this.weatherDataService
            .getRealtimeData()
            .ZambrettiForcastCode + '.png';
    }
}

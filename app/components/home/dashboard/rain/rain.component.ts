import { Component } from '@angular/core';
import { WeatherDataService } from '../../weather-data/weather-data.service';


@Component({
    moduleId: module.id,
    selector: 'rain',
    templateUrl: './rain.component.html'
})

export class RainComponent {
    constructor(
        private weatherDataService: WeatherDataService) { }

    getWeaterImg(): string {
        if (this.weatherDataService.getRealtimeData() === undefined) {
            return '';
        }
        return 'app/assets/img/' + this.weatherDataService
            .getRealtimeData()
            .ZambrettiForcastCode + '.png';
    }
}

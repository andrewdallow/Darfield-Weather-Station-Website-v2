import { Component } from '@angular/core';
import { WeatherDataService } from '../../weather-data/weather-data.service';

@Component({
    moduleId: module.id,
    selector: 'barometer',
    templateUrl: './barometer.component.html'
})

export class BarometerComponent {
    constructor(
        private weatherDataService: WeatherDataService) { }
}

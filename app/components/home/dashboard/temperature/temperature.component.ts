import { Component } from '@angular/core';
import { WeatherDataService } from '../../weather-data/weather-data.service';

@Component({
    moduleId: module.id,
    selector: 'temperature',
    templateUrl: './temperature.component.html',
    providers: []
})

export class TemperatureComponent {
    constructor(
        private weatherDataService: WeatherDataService) { }

}

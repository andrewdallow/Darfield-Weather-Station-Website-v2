import { Component } from '@angular/core';
import { WeatherDataService } from '../../weather-data/weather-data.service';

@Component({
    moduleId: module.id,
    selector: 'wind',
    templateUrl: './wind.component.html'
})

export class WindComponent {
    constructor(
        private weatherDataService: WeatherDataService) { }
}

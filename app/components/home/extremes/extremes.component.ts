import { Component } from '@angular/core';
import { WeatherDataService } from '../weather-data/weather-data.service';

@Component({
    moduleId: module.id,
    selector: 'extremes',
    templateUrl: 'extremes.component.html'
})

export class ExtremesComponent {
    constructor(
        private weatherDataService: WeatherDataService) { }

    private getExtreme(): any {
        return this.weatherDataService.getExtremesData();
    }

}

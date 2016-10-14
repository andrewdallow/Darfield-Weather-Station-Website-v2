import { Component } from '@angular/core';
import { WeatherDataService } from '../../../components';

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

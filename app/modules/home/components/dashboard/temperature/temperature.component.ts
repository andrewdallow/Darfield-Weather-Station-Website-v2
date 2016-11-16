import { Component, Input } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { WeatherDataService } from '../../../../../shared/weather-data/weather-data.service';

@Component({
    moduleId: module.id,
    selector: 'temperature',
    templateUrl: './temperature.component.html',
    providers: []
})

export class TemperatureComponent {
    @Input() data: any;

    constructor(private weatherDataService: WeatherDataService) {

    }

}

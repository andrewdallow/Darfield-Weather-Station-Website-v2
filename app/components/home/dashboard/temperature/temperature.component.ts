import { Component, Input } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { WeatherDataService } from '../../weather-data/weather-data.service';

@Component({
    moduleId: module.id,
    selector: 'temperature',
    templateUrl: './temperature.component.html',
    providers: []
})

export class TemperatureComponent {
    @Input() data: any;
    public test: string = 'test';

    constructor(
        private weatherDataService: WeatherDataService) {

    }

}

import { Component, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs/Rx';
import { WeatherDataService } from '../../../../../shared/weather-data/weather-data.service';


@Component({
    moduleId: module.id,
    selector: 'wind',
    templateUrl: './wind.component.html'
})

export class WindComponent {
    @Input() data: ReplaySubject<any>;
    constructor(
        private weatherDataService: WeatherDataService) { }
}

import { Component } from '@angular/core';
import { WeatherDataService } from '../../components';

@Component({
    moduleId: module.id,
    selector: 'home-component',
    templateUrl: './home.component.html'
})

export class HomeComponent {
    constructor(
        private weatherDataService: WeatherDataService) { }
}

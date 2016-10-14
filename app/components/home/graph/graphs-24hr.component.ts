import { Component } from '@angular/core';
import { WeatherDataService } from '../../../components';

@Component({
    moduleId: module.id,
    selector: 'graphs-24hr',
    templateUrl: 'graphs-24hr.component.html',
    providers: []
})

export class Graphs24HrComponent {
    constructor(
        private weatherDataService: WeatherDataService) { }

    private getGraphData(): any {
        return this.weatherDataService.getGraphs24HrData();
    }

}

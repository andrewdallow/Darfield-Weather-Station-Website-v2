import { Component, OnInit} from '@angular/core';

import { WeatherDataService } from '../../../../shared/weather-data/weather-data.service';

@Component({
    moduleId: module.id,
    selector: 'graphs-24hr',
    templateUrl: 'graphs-24hr.component.html',
    providers: []
})

export class Graphs24HrComponent implements OnInit {
    public graphData: any;
    constructor(
        private weatherDataService: WeatherDataService) { }

    ngOnInit(): void {
        this.weatherDataService.getGraphs24HrData().subscribe(
            data => {
                this.graphData = data;
            }
        );
    }



}

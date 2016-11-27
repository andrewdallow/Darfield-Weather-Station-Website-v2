import { Component, OnInit} from '@angular/core';
import { SettingsService } from '../../../../shared/config/settings.service';

import { WeatherDataService } from '../../../../shared/weather-data/weather-data.service';

@Component({
    moduleId: module.id,
    selector: 'graphs-24hr',
    templateUrl: 'graphs-24hr.component.html',
    providers: []
})
/**
 * This class represents the lazy loaded Graphs24HrComponent, which loads
 * the highcharts last 24 hrs charts.
 */
export class Graphs24HrComponent implements OnInit {
    public graphData: any;
    constructor(
        private weatherDataService: WeatherDataService,
        private settingsService: SettingsService
    ) { }

    ngOnInit(): void {
        this.weatherDataService.setGraphs24HrData().then(
            () => {
                this.weatherDataService.getGraphs24HrData().subscribe(
                    data => {
                        this.graphData = data;
                    }
                );
            });
    }

}

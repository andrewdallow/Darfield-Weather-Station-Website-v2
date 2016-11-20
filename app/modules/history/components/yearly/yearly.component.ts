import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

import { AppSettings } from '../../../../shared/config/settings';
import { HistoricDataService } from '../../services/historic-data.service';
import { HistoricData } from '../../services/historic-data.model';

@Component({
    moduleId: module.id,
    templateUrl: 'yearly.component.html',
})
export class YearlyComponent implements OnInit {
    public data: HistoricData;
    public selectedYear: string;

    constructor(
        private titleService: Title,
        private historicDataService: HistoricDataService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.selectYear();
    }

    compareMaxTemp(temp: string): number {
        return this.compareValue(+temp, +this.data.alltime.maxTemp);
    }
    compareMinTemp(temp: string): number {
        return this.compareValue(+temp, +this.data.alltime.minTemp);
    }
    compareGust(speed: string): number {
        return this.compareValue(+speed, +this.data.alltime.highWindGust);
    }

    compareAvgTemp(temp: string): number {
        return this.compareValue(+temp,
            AppSettings.HISTORIC_ALLTIME_AVG['avgTemp']);
    }
    compareAvgHiTemp(temp: string): number {
        return this.compareValue(+temp,
            AppSettings.HISTORIC_ALLTIME_AVG['avgMaxTemp']);
    }
    compareAvgLoTemp(temp: string): number {
        return this.compareValue(+temp,
            AppSettings.HISTORIC_ALLTIME_AVG['avgMinTemp']);
    }
    compareRainTemp(rain: string): number {
        return this.compareValue(+rain,
            AppSettings.HISTORIC_ALLTIME_AVG['totRainFall']);
    }
    compareValue(a: number, b: number): number {
        return Math.round((a - b) * 100) / 100;
    }
    /**
     * Set the data for the chosen month and year.
     * @param {string} year  year of data
     * @param {string} month month of data
     */
    private setData(year: string): void {
        this.historicDataService.setYearlyData(year);
        this.historicDataService.yearlyData.subscribe(
            (data: any) => {
                this.data = data;
            }
        );
    }
    /**
     * Set the month an year as specified in the URL parameters and
     * then set the data.
     */
    private selectYear(): void {
        this.route.params.subscribe(
            (params: Params) => {
                this.selectedYear = params['year'];
                this.titleService.setTitle('Yearly History - '
                    + params['year'] + ' - '
                    + AppSettings.SITE_NAME);
                this.setData(this.selectedYear);
            }
        );
    }
}

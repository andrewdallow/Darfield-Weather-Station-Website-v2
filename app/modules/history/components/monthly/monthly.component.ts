import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

import { SettingsService } from '../../../../shared/config/settings.service';
import { HistoricDataService } from '../../services/historic-data.service';
import { HistoricData } from '../../services/historic-data.model';

@Component({
    moduleId: module.id,
    templateUrl: 'monthly.component.html',
})
/**
 * Handles the display of the historic monthly page.
 */
export class MonthlyComponent implements OnInit {

    public data: HistoricData;
    public selectedMonth: string;
    public selectedYear: string;
    private settings: any;
    private siteName: string;

    constructor(
        private titleService: Title,
        private historicDataService: HistoricDataService,
        private route: ActivatedRoute,
        private router: Router,
        private settingsService: SettingsService
    ) { }

    ngOnInit() {
        this.settingsService.config.then(
            (config: any) => {
                this.siteName = config.siteName;
                this.settings = config.historicData;
                this.selectMonthYear();
            }
        );
    }
    /**
     * Compare specified temperature to the alltime maximum temperature.
     * @param  {string} temp temperature value
     * @return {number}      the difference between the temp and alltime max.
     */
    compareMaxTemp(temp: string): number {
        return this.compareValue(+temp, +this.data.alltime.maxTemp);
    }
    /**
     * Compare specified temperature to the alltime minimum temperature.
     * @param  {string} temp temperature value
     * @return {number}      the difference between the temp and alltime min.
     */
    compareMinTemp(temp: string): number {
        return this.compareValue(+temp, +this.data.alltime.minTemp);
    }
    /**
     * Compare specified wind gust to the alltime maximum wind gust.
     * @param  {string} speed wind speed value
     * @return {number}      the difference between the wind speed and alltime max.
     */
    compareGust(speed: string): number {
        return this.compareValue(+speed, +this.data.alltime.highWindGust);
    }
    /**
     * Compare specified temperature to the monthly normal temperature.
     * @param  {string} temp temperature value
     * @return {number}      the difference between the temp and monthly normal.
     */
    compareAvgTemp(temp: string): number {
        return this.compareValue(+temp,
            this.settings
                .averageMonthlyTemperature[this.selectedMonth.toLowerCase()]);
    }
    /**
     * Compare specified temperature to the monthly normal temperature high.
     * @param  {string} temp temperature value
     * @return {number}      the difference between the temp and monthly normal high.
     */
    compareAvgHiTemp(temp: string): number {
        return this.compareValue(+temp,
            this.settings
                .averageMonthlyHighTemperature[this.selectedMonth.toLowerCase()]);
    }
    /**
     * Compare specified temperature to the monthly normal temperature low.
     * @param  {string} temp temperature value
     * @return {number}      the difference between the temp and monthly normal low.
     */
    compareAvgLoTemp(temp: string): number {
        return this.compareValue(+temp,
            this.settings
                .averageMonthlyLowTemperature[this.selectedMonth.toLowerCase()]);
    }
    /**
     * Compare specified temperature to the monthly normal rainfall total.
     * @param  {string} rain rainfall value
     * @return {number}      the difference between the rainfall
     *                       and monthly normal total.
     */
    compareRain(rain: string): number {
        return this.compareValue(+rain,
            this.settings
                .averageMonthlyRain[this.selectedMonth.toLowerCase()]);
    }
    /**
     * Calculate the difference between two numbers to 0.1 precision.
     * @param  {number} a first number
     * @param  {number} b second number
     * @return {number}   difference between a and b.
     */
    compareValue(a: number, b: number): number {
        return Math.round((a - b) * 100) / 100;
    }

    /**
     * Set the data for the chosen month and year.
     * @param {string} year  year of data
     * @param {string} month month of data
     */
    private setData(year: string, month: string): void {
        this.historicDataService.setMonthlyData(year, month).then(
            () => {
                this.historicDataService.monthlyData.subscribe(
                    (data: any) => {
                        this.data = data;
                    }
                );
            }
        );
    }
    /**
     * Set the month an year as specified in the URL parameters and
     * then set the data.
     */
    private selectMonthYear(): void {
        this.route.params.subscribe(
            (params: Params) => {
                this.selectedMonth = params['month'];
                this.selectedYear = params['year'];
                this.titleService.setTitle('Monthly History - '
                    + params['month'] + '-' + params['year'] + ' - '
                    + this.siteName);
                this.setData(this.selectedYear,
                    moment().month(this.selectedMonth).format('MM'));
            }
        );
    }


}

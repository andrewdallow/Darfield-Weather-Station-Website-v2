import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import * as moment from 'moment';

import { SettingsService } from '../../../../shared/config/settings.service';
import { HistoricDataService } from '../../services/historic-data.service';



@Component({
    moduleId: module.id,
    templateUrl: 'climate.component.html',
})
/**
 * Handles the display and interactions of the climate page.
 */
export class ClimateComponent implements OnInit {
    public selectedValue: any;
    public data: any[];
    public months = moment.monthsShort();
    public dataTypes: any;
    public status: { isopen: boolean } = { isopen: false };
    private climateData: any;

    constructor(private titleService: Title,
        private historicDataService: HistoricDataService,
        private settingsService: SettingsService
    ) { }

    ngOnInit(): void {
        this.settingsService.config.then(
            (config: any) => {
                this.dataTypes = config.climateSections;
                this.titleService.setTitle('Climate Tables - ' + config.siteName);
                this.selectedValue = this.dataTypes[0].children[0];
                this.setData();
            }
        );

    }
    /**
     * Set the data used by the tables and charts.
     */
    private setData(): void {
        this.historicDataService.setClimateData().then(
            () => {
                this.historicDataService.climateData.subscribe(
                    (data: any) => {
                        this.climateData = data;
                        this.getSelectedData(this.dataTypes[0].children[0]);
                    });
            });
    }
    /**
     * Get the overall maximum value for the given data sets.
     * @param  {any}    data data sets grouped by year
     * @return {number}      max value
     */
    maxValue(data: any[]): number {
        let values: any[] = [];
        for (let entry of data) {
            values = values.concat(entry.data);
        }
        return Math.max(...values);
    }
    /**
     * Get the overall minimum value for the given data sets.
     * @param  {any}    data data sets grouped by year
     * @return {number}      min value
     */
    minValue(data: any[]): number {
        let values: any[] = [];
        for (let entry of data) {
            values = values.concat(entry.data.filter((val: any) => { return val !== null; }));
        }
        return Math.min(...values);
    }
    /**
     * Set the currently displayed data to the specified climate section.
     * @param {Object} dataType object specifiing climate section.
     */
    getSelectedData(dataType: any): void {
        this.data = [];
        this.selectedValue = dataType;
        for (let entry of this.climateData) {
            let values: any = [];
            for (let data of entry.data) {
                if (data[this.toCamelCase(dataType.name)]) {
                    values.push(+data[this.toCamelCase(dataType.name)]);
                } else {
                    values.push(null);
                }
            }
            this.data.push({
                name: entry.year,
                data: values
            });
        }
        this.data['min'] = this.minValue(this.data);
        this.data['max'] = this.maxValue(this.data);
    }
    /**
     * Convert the specified string to comel case format
     * @param  {string} str string to be converted
     * @return {string}     camel case string
     */
    private toCamelCase(str: string): string {
        let strArray = str.split(' ');
        strArray[0] = strArray[0].toLowerCase();
        for (let i = 1; i < strArray.length; i++) {
            strArray[i] = strArray[i][0].toUpperCase() + strArray[i].slice(1);
        }
        return strArray.join('');

    }

}

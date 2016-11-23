import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import * as moment from 'moment';

import { AppSettings } from '../../../../shared/config/settings';
import { HistoricDataService } from '../../services/historic-data.service';



@Component({
    moduleId: module.id,
    templateUrl: 'climate.component.html',
})
export class ClimateComponent implements OnInit {
    public selectedValue: any;
    public data: any[];
    public months = moment.monthsShort();
    public dataTypes = AppSettings.CLIMATE_SECTIONS;
    public status: { isopen: boolean } = { isopen: false };
    private climateData: any;

    constructor(private titleService: Title,
        private historicDataService: HistoricDataService
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle('Climate Tables - ' + AppSettings.SITE_NAME);
        this.selectedValue = this.dataTypes[0].children[0];
        this.setData();
    }

    private setData(): void {
        this.historicDataService.setClimateData();
        this.historicDataService.climateData.subscribe(
            (data: any) => {
                this.climateData = data;
                this.getSelectedData(this.dataTypes[0].children[0]);
            }
        );
    }

    maxValue(data: any): number {

        let values: any[] = [];
        for (let entry of data) {
            values = values.concat(entry.data);
        }
        return Math.max(...values);
    }
    minValue(data: any): number {

        let values: any[] = [];
        for (let entry of data) {
            values = values.concat(entry.data.filter((val: any) => { return val !== null; }));
        }
        return Math.min(...values);
    }

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

    private toCamelCase(str: string): string {
        let strArray = str.split(' ');
        strArray[0] = strArray[0].toLowerCase();
        for (let i = 1; i < strArray.length; i++) {
            strArray[i] = strArray[i][0].toUpperCase() + strArray[i].slice(1);
        }
        return strArray.join('');

    }

}

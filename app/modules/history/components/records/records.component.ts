import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import * as moment from 'moment';

import { SettingsService } from '../../../../shared/config/settings.service';
import { HistoricDataService } from '../../services/historic-data.service';

@Component({
    moduleId: module.id,
    templateUrl: 'records.component.html'
})
/**
 * Handles the display of the Records page.
 */
export class RecordsComponent implements OnInit {
    public data: any;
    constructor(
        private titleService: Title,
        private historicDataService: HistoricDataService,
        private settingsService: SettingsService
    ) { }

    ngOnInit(): void {
        this.settingsService.config.then(
            (_config: any) => {
                this.titleService.setTitle('Records - ' + _config.siteName);
                this.setData();
            }
        );
    }
    /**
     * Get the link to the monthly history page for the given date.
     * @param  {string} date date in formate DD MMM YYY.
     * @return {string}      link to monthly page
     */
    getMonthlyLink(date: string): string {
        let link = '/history/monthly';

        link += '/' + moment(date, 'DD MMM YYYY').format('YYYY');
        link += '/' + moment(date, 'DD MMM YYYY').format('MMMM');

        return link;
    }

    /**
     * Set the alltime record data.
     */
    private setData(): void {
        this.historicDataService.setRecordsData().then(
            () => {
                this.historicDataService.recordsData.subscribe(
                    (data: any) => {
                        this.data = data;
                    }
                );
            }
        );
    }
}

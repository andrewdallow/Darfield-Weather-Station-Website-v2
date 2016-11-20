import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import * as moment from 'moment';

import { HistoricDataService } from '../../services/historic-data.service';

@Component({
    moduleId: module.id,
    templateUrl: 'records.component.html'
})
export class RecordsComponent implements OnInit {
    public data: any;
    constructor(
        private titleService: Title,
        private historicDataService: HistoricDataService
    ) { }

    ngOnInit(): void {
        this.setData();
    }

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
        this.historicDataService.setRecordsData();
        this.historicDataService.recordsData.subscribe(
            (data: any) => {
                console.log(data);
                this.data = data;
            }
        );
    }
}

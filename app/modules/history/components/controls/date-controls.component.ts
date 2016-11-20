import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

import { HistoricDataService } from '../../services/historic-data.service';
@Component({
    moduleId: module.id,
    selector: 'date-controls',
    templateUrl: 'date-controls.component.html'
})

export class DateControlsComponent implements OnInit {
    @Input() dateType: string;
    public validDates: any;
    public monthNames: string[];
    public selectedYear: string;
    public selectedMonth: string;

    constructor(
        private historicDataService: HistoricDataService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        this.setYearMonth();
        this.setValidDates();
        this.monthNames = moment.months();
    }
    private setYearMonth(): void {
        this.route.params.subscribe(
            (params: Params) => {
                if (this.dateType === 'monthly') {
                    this.selectedMonth = params['month'];
                    this.selectedYear = params['year'];
                } else if (this.dateType === 'yearly') {
                    this.selectedYear = params['year'];
                }

            }
        );
    }
    isValidMonth(year: string, month: string): boolean {
        let isValid: boolean;
        let currentMonth = +moment().month(month).format('MM');

        if (year === moment().format('YYYY')) {
            isValid = currentMonth <= +moment().format('MM');
        } else {
            if (this.validDates) {
                for (let date of this.validDates) {
                    if (this.getYear(date.logDate) === year) {
                        isValid = currentMonth >= +moment(date.logDate, 'YYYY-MM-DD').format('MM');
                        break;
                    }
                }
            }
        }

        return isValid;
    }

    getYear(date: string): string {
        return moment(date, 'YYYY-MM-DD').format('YYYY');
    }

    gotoMonth(month: string): void {
        this.router.navigate(['/history/monthly', this.selectedYear, month]);
    }

    gotoYear(year: string): void {
        if (this.dateType === 'monthly') {
            this.router.navigate(['/history/monthly', year, this.selectedMonth]);
        } else if (this.dateType === 'yearly') {
            this.router.navigate(['/history/yearly', year]);
        }
    }

    nextMonth(): void {
        let date = moment().year(+this.selectedYear).month(this.selectedMonth).add(1, 'month');
        if (this.isValidMonth(date.format('YYYY'), date.format('MMMM'))) {
            this.selectedYear = date.format('YYYY');
            this.gotoMonth(date.format('MMMM'));
        }

    }

    previousMonth(): void {
        let date = moment().year(+this.selectedYear).month(this.selectedMonth).subtract(1, 'month');
        if (this.isValidMonth(date.format('YYYY'), date.format('MMMM'))) {
            this.selectedYear = date.format('YYYY');
            this.gotoMonth(date.format('MMMM'));
        }
    }

    private setValidDates(): void {
        this.historicDataService.setValidDates();
        this.historicDataService.validDatesData.subscribe(
            (dates: any) => {
                this.validDates = dates;
            }
        );
    }
}

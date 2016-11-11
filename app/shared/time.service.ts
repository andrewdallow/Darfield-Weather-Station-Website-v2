import { Injectable } from '@angular/core';
import { AppSettings } from '../config/settings';

@Injectable()
export class TimeService {
    constructor() { }
    /**
     * Convert Unix time to format dd/MM/YYY hh:mm.
     * @param {number} time - unix timestamp
     * @return {string) dateString - formated date
     */
    unixTimeConverter(time: number): string {
        let months = AppSettings.MONTH_NAMES;
        let date = new Date(time);
        let dateString =
            this.addZero(date.getDate()) + '-' +
            months[date.getMonth()] + '-' +
            date.getFullYear() + ' ' +
            this.addZero(date.getHours()) + ':' +
            this.addZero(date.getMinutes()) + ':' +
            this.addZero(date.getSeconds());
        return dateString;
    }

    subtractDays(date: Date, days: number): Date {
        return new Date(date.setDate(date.getDate() - days));
    }


    /**
     * Add a zero to the front of a given number if less than 10
     * @param {number} value - to be altered
     * @return {string} fixedValue - of fixed number
     */
    private addZero(value: number): string {
        let fixedValue: string = value.toString();
        if (value < 10) {
            fixedValue = '0' + value.toString();
        }
        return fixedValue;
    }
}

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AppSettings } from '../../../shared/config/settings';
import { HistoricData } from './historic-data.model';

@Injectable()
export class HistoricDataService {

    private monthly: Observable<HistoricData>;
    private yearly: Observable<HistoricData>;
    private climate: Observable<any>;
    private records: Observable<any>;
    private validDates: Observable<any>;

    constructor(private http: Http) { }

    get validDatesData(): Observable<any> {
        return this.validDates;
    }

    get recordsData(): Observable<any> {
        return this.records;
    }

    get monthlyData(): Observable<HistoricData> {
        return this.monthly;
    }
    get yearlyData(): Observable<HistoricData> {
        return this.yearly;
    }
    get climateData(): Observable<any> {
        return this.climate;
    }
    setValidDates(): void {
        this.validDates = this.getData(AppSettings.HISTORIC_MONTHLY_FILE
            + '?dates=1');
    }

    setClimateData(): void {
        this.climate = this.getData(AppSettings.HISTORIC_CLIMATE_FILE);
    }

    setMonthlyData(year: string, month: string): void {
        this.monthly = this.getData(AppSettings.HISTORIC_MONTHLY_FILE
            + '?year=' + year + '&month=' + month);
    }
    setYearlyData(year: string): void {
        this.yearly = this.getData(AppSettings.HISTORIC_MONTHLY_FILE
            + '?year=' + year);
    }

    setRecordsData(): void {
        this.records = this.getData(AppSettings.HISTORIC_RECORDS);
    }

    /**
     * Get JSON formated data from the provided path using an Http get.
     * @return {Observable<any>}
     */
    private getData(path: string): Observable<HistoricData> {
        return this.http.get(path)
            .map((res: Response) => res.json(), this.getOptions());
    }
    /**
     *Get the Request Header Options for an Http request.
     * @return {RequestOptions} opts
     */
    private getOptions(): RequestOptions {
        let headers: Headers = new Headers();
        headers.append('content-type',
            'application/json; charset=utf-8');
        let opts = new RequestOptions({ headers: headers });
        opts.headers = headers;
        return opts;
    }

}

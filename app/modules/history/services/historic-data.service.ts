import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SettingsService } from '../../../shared/config/settings.service';
import { HistoricData } from './historic-data.model';
/**
 * This class provides the HistoricDataService with methods to read and set the
 * historic data.
 */
@Injectable()
export class HistoricDataService {

    private monthly: Observable<HistoricData>;
    private yearly: Observable<HistoricData>;
    private climate: Observable<any>;
    private records: Observable<any>;
    private validDates: Observable<any>;

    constructor(private http: Http,
        private settingsService: SettingsService
    ) { }

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
    setValidDates(): Promise<any> {
        return this.settingsService.config.then(
            (_config: any) => {
                this.validDates = this.getData(_config.files.historicData
                    + '?dates=1');
            });
    }

    setClimateData(): Promise<any> {
        return this.settingsService.config.then(
            (_config: any) => {
                this.climate = this.getData(_config.files.climateData);
            });
    }

    setMonthlyData(year: string, month: string): Promise<any> {
        return this.settingsService.config.then(
            (_config: any) => {
                this.monthly = this.getData(_config.files.historicData
                    + '?year=' + year + '&month=' + month);
            });

    }
    setYearlyData(year: string): Promise<any> {
        return this.settingsService.config.then(
            (_config: any) => {
                this.yearly = this.getData(_config.files.historicData
                    + '?year=' + year);
            });

    }

    setRecordsData(): Promise<any> {
        return this.settingsService.config.then(
            (_config: any) => {
                this.records = this.getData(_config.files.records);
            });
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

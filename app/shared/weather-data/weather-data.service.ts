import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

import { SettingsService } from '../../shared/config/settings.service';

import { RealtimeData } from '../data-schemes/realtime-data';
import { Graph24HrsData } from '../data-schemes/graphs-24hr-data';
import { Extremes } from '../data-schemes/extremes-data';
import { RapidUpdateData } from '../data-schemes/rapid-update-data';

/**
 * Class representing the services to get the current weather data.
 */
@Injectable()
export class WeatherDataService {

    private realtimeData: RealtimeData;
    private graph24HrsData: Observable<Graph24HrsData>;
    private extremes: Extremes;
    private isUpdated: boolean = false;
    private isConverted: boolean = false;
    private settings: any;

    constructor(
        private http: Http,
        private settingsService: SettingsService
    ) {
        this.settingsService.config.then(
            (_config: any) => {
                this.settings = _config.files;
                this.setRealtimeData();
                this.setExtremesData();
            });

    }
    /**
     * Set flag on whether to convert the data units or not.
     * @param {boolean} isConverted true to convert, false otherwise.
     */
    convertUnits(isConverted: boolean): void {
        this.isConverted = isConverted;
    }
    /**
     * Get the flag on whether the data units should be converted or not.
     * @return {boolean} [description]
     */
    getIsConverted(): boolean {
        return this.isConverted;
    }

    /**
     * Set the Realtime weather data.
     */
    setRealtimeData(): void {
        this.getData(this.settings.realtime).subscribe(
            data => {
                if (this.realtimeData === undefined) {
                    this.realtimeData = data;
                    this.realtimeData.time = moment(this.realtimeData.time,
                        'DD/MMM/YYYY HH:mm').format('DD-MMM-YYYY HH:mm:ss');
                } else {
                    this.getRapidData().subscribe(
                        rapidData => {
                            if (((+rapidData.time) * 1000) > Date.parse(this.realtimeData.time)
                                || Date.parse(data.time) > Date.parse(this.realtimeData.time)) {
                                data.time = moment(data.time, 'DD/MMM/YYYY HH:mm')
                                    .format('DD-MMM-YYYY HH:mm:ss');
                                rapidData.time = moment(moment.unix(+rapidData.time))
                                    .format('DD-MMM-YYYY HH:mm:ss');
                                if (Date.parse(data.time) > Date.parse(rapidData.time)) {
                                    rapidData.time = data.time;
                                    this.isUpdated = true;
                                }
                                this.realtimeData = this.updateData(data, rapidData);
                            } else {
                                this.isUpdated = false;
                            }
                        });
                }
            }
        );
    }
    /**
     * Set the Extremes weather data.
     */
    setExtremesData(): void {
        this.getData(this.settings.extremes).subscribe(
            data => {
                this.extremes = data;
            }
        );
    }
    /**
     * Set the 24Hr Graphs weather data.
     */
    setGraphs24HrData(): Promise<any> {
        return this.settingsService.config.then(
            (_config: any) => {
                this.graph24HrsData = this.getData(_config.files.graphs24Hr);
            });

    }

    /**
     * Returns the realtime json data specified by the settings file.
     * @return {Observable<RealtimeData>} - realtime weather data
     */
    getRealtimeData(): RealtimeData {
        return this.realtimeData;
    }
    /**
     * Returns the extremes json data specified by settings file.
     * @return {Observable<Extremes>} - extremes weather data
     */
    getExtremesData(): Extremes {
        return this.extremes;
    }
    /**
     * Returns the 24Hr Graph json data specified by settings file.
     * @return {Observable<Graph24HrsData>} - Graphs 24Hr weather data
     */
    getGraphs24HrData(): Observable<Graph24HrsData> {
        return this.graph24HrsData;
    }

    /**
     * Checks if newData is more recent than currentData, if so currentData
     * is update with the more recent data.
     * @param {RealtimeData} currentData - data already received
     * @param {RapidUpdateData} newData - most recent data
     * @return {RealtimeData} - updated realtime data
     */
    rapidUpdate(): void {
        this.getRapidData().subscribe(
            rapidData => {
                if (((+rapidData.time) * 1000) > Date.parse(this.realtimeData.time)) {
                    rapidData.time = moment(moment.unix(+rapidData.time))
                        .format('DD-MMM-YYYY HH:mm:ss');
                    this.realtimeData = this.updateData(this.realtimeData, rapidData);
                    this.isUpdated = true;
                } else {
                    this.isUpdated = false;
                }
            });
    }

    /**
     *
     */
    getIsUpdated(): boolean {
        return this.isUpdated;
    }
    /**
     * Returns the rapid update json data specified by RAPID_UPDATE_FILE in
     * the settings file.
     * @return {Observable<RapidUpdateData>} - Graphs 24Hr weather data
     */
    private getRapidData(): Observable<RapidUpdateData> {
        return this.getData(this.settings.now);
    }
    /**
     * Iterate over data and update it with newData.
     * @param {RealtimeData} oldData - the current data set
     * @param {RapidUpdateData} newData - the new data values
     * @return {RealtimeData} oldData  - updated with newData
     */
    private updateData(oldData: RealtimeData, newData: RapidUpdateData):
        RealtimeData {
        for (let key in newData) {
            if (newData.hasOwnProperty(key) && key !== 'units') {
                if (typeof oldData[key] !== 'string') {
                    oldData[key]['value'] = newData[key];
                } else {
                    oldData[key] = newData[key];
                }
            }
        }
        return oldData;
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
    /**
     * Get JSON formated data from the provided path using an Http get.
     * @return {Observable<any>}
     */
    private getData(path: string): Observable<any> {
        return this.http.get(path)
            .map((res: Response) => res.json(), this.getOptions());
    }


}

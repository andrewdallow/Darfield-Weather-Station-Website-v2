import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../../config/settings';
import { TimeService } from '../../../shared/time.service';

import { RealtimeData } from '../../../shared/data-schemes/realtime-data';
import { Graph24HrsData } from '../../../shared/data-schemes/graphs-24hr-data';
import { Extremes } from '../../../shared/data-schemes/extremes-data';
import { RapidUpdateData } from '../../../shared/data-schemes/rapid-update-data';

/**
 * Class representing the services to get the current weather data.
 */
@Injectable()
export class WeatherDataService {

    private realtimeData: RealtimeData;
    private graph24HrsData: Graph24HrsData;
    private extremes: Extremes;
    private isUpdated: boolean = false;

    constructor(private http: Http, private timeService: TimeService) {
        this.setRealtimeData();
        this.setExtremesData();
        this.setGraphs24HrData();
    }

    /**
     * Set the Realtime weather data.
     */
    setRealtimeData(): void {
        this.getData(AppSettings.REALTIME_FILE).subscribe(
            data => {
                if (this.realtimeData === undefined) {
                    this.realtimeData = data;
                    this.realtimeData.time = this.timeService
                        .unixTimeConverter(
                        (new Date(this.realtimeData.time)).getTime());
                } else {
                    let currentTime = new Date(this.realtimeData.time);
                    let latestTime = new Date(data.time);
                    if (latestTime > currentTime) {
                        this.realtimeData = data;
                        this.realtimeData.time = this.timeService
                            .unixTimeConverter(
                            (new Date(this.realtimeData.time)).getTime());
                        this.isUpdated = true;
                    } else {
                        this.isUpdated = false;
                    }
                }
            }
        );
    }
    /**
     * Set the Extremes weather data.
     */
    setExtremesData(): void {
        this.getData(AppSettings.EXTREMES_FILE).subscribe(
            data => {
                this.extremes = data;
            }
        );
    }
    /**
     * Set the 24Hr Graphs weather data.
     */
    setGraphs24HrData(): void {
        this.getData(AppSettings.GRAPHS24HR_FILE).subscribe(
            data => {
                this.graph24HrsData = data;
            }
        );
    }

    /**
     * Returns the realtime json data specified by REALTIME_FILE in AppSettings.
     * @return {Observable<RealtimeData>} - realtime weather data
     */
    getRealtimeData(): RealtimeData {
        return this.realtimeData;
    }
    /**
     * Returns the extremes json data specified by EXTREMES_FILE in AppSettings.
     * @return {Observable<Extremes>} - extremes weather data
     */
    getExtremesData(): Extremes {
        return this.extremes;
    }
    /**
     * Returns the 24Hr Graph json data specified by GRAPHS24HR_FILE in
     * AppSettings.
     * @return {Observable<Graph24HrsData>} - Graphs 24Hr weather data
     */
    getGraphs24HrData(): Graph24HrsData {
        return this.graph24HrsData;
    }

    /**
     * Checks if newData is more recent than currentData, if so currentData
     * is update with the more recent data.
     * @param {RealtimeData} currentData - data already received
     * @param {RapidUpdateData} newData - most recent data
     * @return {RealtimeData} - updated realtime data
     */
    rapidUpdate():
        void {
        this.getRapidData().subscribe(
            rapidData => {
                if (this.realtimeData !== undefined) {
                    let currentTime = new Date(this.realtimeData.time);
                    let time = parseFloat(rapidData.time) * 1000;
                    if (time > currentTime.getTime()) {
                        rapidData.time = this.timeService.unixTimeConverter(time);
                        this.realtimeData = this.updateData(this.realtimeData, rapidData);
                        this.isUpdated = true;
                    } else {
                        this.isUpdated = false;
                    }
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
     * AppSettings.
     * @return {Observable<RapidUpdateData>} - Graphs 24Hr weather data
     */
    private getRapidData(): Observable<RapidUpdateData> {
        return this.getData(AppSettings.RAPID_UPDATE_FILE);
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

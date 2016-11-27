import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SettingsService } from '../../shared/config/settings.service';

/**
 * Class representing the service RealtimeGraphDataService with methods for setting
 * and reading the realtime graph data.
 */
@Injectable()
export class RealtimeGraphDataService {
    private realtimeData: Observable<any>;

    constructor(
        private http: Http,
        private settingsService: SettingsService
    ) { }
    /**
     * Get the realtime graoh data
     * @return {Observable<any>} graph data
     */
    getGraphData(): Observable<any> {
        return this.realtimeData;
    }

    /**
     * Set the realtime graph data with the specified timespan in hours
     * @param  {number}       hours time span
     * @return {Promise<any>}
     */
    setGraphData(hours: number): Promise<any> {

        return this.settingsService.config.then(
            (_config: any) => {
                this.realtimeData = this.getData(_config.files.realtimeDatabase
                    + `?hours=${hours}`);
            });
    }
    /**
     * Map the time data to the weather values.
     * @param  {Array<any>} t time data
     * @param  {Array<any>} y weather data
     * @return {Array<any>}   mapped data
     */
    mapSeries(t: Array<any>, y: Array<any>): Array<any> {
        let series: Array<any> = [];
        if (t.length === y.length) {
            for (let i = 0; i < t.length; i++) {
                series = series.concat([[t[i], y[i]]]);
            }
        }
        return series;
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
            .map((res: Response) => res.json(), this.getOptions())
            .catch(this.handleError);
    }
    /**
     * Handle HTTP error
     */
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}

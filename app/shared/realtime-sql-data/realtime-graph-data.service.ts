import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { AppSettings } from '../../shared/config/settings';

/**
 * Class representing the services to get the current weather data.
 */
@Injectable()
export class RealtimeGraphDataService {
    private realtimeData: Observable<any>;

    constructor(private http: Http) { }

    getGraphData(): Observable<any> {
        return this.realtimeData;
    }


    setGraphData(hours: number): void {
        this.realtimeData = this.getData(AppSettings.REALTIME_SQL_FILE + `?hours=${hours}`);

    }

    mapSeries(x: Array<any>, y: Array<any>): Array<any> {
        let series: Array<any> = [];
        if (x.length === y.length) {
            for (let i = 0; i < x.length; i++) {
                series = series.concat([[x[i], y[i]]]);

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

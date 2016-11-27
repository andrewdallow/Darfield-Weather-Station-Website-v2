import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SettingsService } from '../../../shared/config/settings.service';

/**
 * This class provides the ForecastDataService with methods to read and set the
 * current forecast.
 */
@Injectable()
export class ForecastDataService {
    private forecast: Observable<any>;

    constructor(
        private http: Http,
        private settingsService: SettingsService
    ) { }
    /**
     * Get the current forecast data.
     * @return {Observable<any>} forecast data
     */
    get forcastData(): Observable<any> {
        return this.forecast;
    }
    /**
     * Set the weather undergraound forecast data.
     * @return {Promise<any>}
     */
    setWUforcast(): Promise<any> {
        let url: string, settings: any;
        return this.settingsService.config.then(
            (_config: any) => {
                settings = _config.forecast;
                url = settings.wuUrl + settings.wuApiKey + '/'
                    + settings.forecastName + '/q/'
                    + settings.wuStation + settings.format;
                this.forecast = this.getData(url);
            }
        );

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
            .publishReplay(1)
            .refCount()
            .catch(this.handleError);
    }
    /**
     * Handle HTTP error
     */
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }


}

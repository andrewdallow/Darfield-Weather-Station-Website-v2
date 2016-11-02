import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { AppSettings } from '../../config/settings';


@Injectable()
export class WebcamFilesService {
    private webcamFiles: Observable<Array<Object>>;

    constructor(private http: Http) {
        this.webcamFiles = this.getFileList(AppSettings.WEBCAM_FILENAME);
    }

    get fileNames(): Observable<Array<Object>> {
        return this.webcamFiles;
    }

    /**
     * Get the Request Header Options for an Http request.
     * @return {RequestOptions} options
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
    private getFileList(path: string): Observable<Array<string>> {
        return this.http.get(path)
            .map((res: Response) => res.json(), this.getOptions());
    }
}

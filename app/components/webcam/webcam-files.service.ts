import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AppSettings } from '../../config/settings';


@Injectable()
export class WebcamFilesService {

    constructor(private http: Http) { }

    getFileNames(): Promise<any> {
        return this.getFileList(AppSettings.WEBCAM_FILENAME);
    }

    /**
     * Get JSON formated data from the provided path using an Http get.
     * @return {Observable<any>}
     */
    private getFileList(path: string): Promise<Array<any>> {
        return this.http.get(path)
            .toPromise()
            .then((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

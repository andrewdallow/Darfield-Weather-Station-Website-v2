import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { SettingsService } from '../../../shared/config/settings.service';

/**
 * This class provides the WebcamFilesService with methods to read and set the
 * list of webcam files.
 */
@Injectable()
export class WebcamFilesService {
    private fileList: Promise<any>;

    constructor(private http: Http,
        private settingsService: SettingsService
    ) { }
    /**
     * Get the list of all webcam file paths and names
     * @return {Promise<any>} list of paths and names
     */
    getFileNames(): Promise<any> {
        return this.fileList;
    }
    /**
     * Set the list of all webcam file paths and names
     * @return {Promise<any>}
     */
    setFileNames(): Promise<any> {
        return this.settingsService.config.then(
            (_config: any) => {
                this.fileList = this.getFileList(_config.files.webcamImageList);
            });
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
    /**
     * Handle HTTP error
     */
    private handleError(error: any): Promise<any> {
        console.error('Error in retrieving webcam files', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

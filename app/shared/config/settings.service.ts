import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

/**
 * This class provides SettingsService with methods to read the
 * configuration file of global contants.
 */
@Injectable()
export class SettingsService {

    private configuration: Promise<any>;

    constructor(private http: Http) {
        this.setConfig();
    }
    /**
     * Gets the current configuration settings.
     * @return {Promise<any>} configuration settings
     */
    get config(): Promise<any> {
        return this.configuration;
    }
    /**
     * Set the configuration settings.
     */
    private setConfig(): void {
        this.configuration = this.getSettings('app/settings.json');
    }

    /**
     * Get JSON formated data from the provided path using an Http get.
     * @return {Observable<any>}
     */
    private getSettings(path: string): Promise<any> {
        return this.http.get(path)
            .toPromise()
            .then((res: Response) => res.json())
            .catch(this.handleError);
    }
    /**
   * Handle HTTP error
   */
    private handleError(error: any): Promise<any> {
        console.error('The Settings file encountered an error', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

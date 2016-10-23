import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { WeatherDataService } from '../../../components';
import { AppSettings } from '../../../config/settings';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    providers: []
})

export class DashboardComponent implements OnInit, OnDestroy {

    private secondsAgo: number;
    private updateCounter: number;
    private realtimeTimer: any;
    private rapidTimer: any;
    private lastUpdateTimer: any;
    private isPaused: boolean;
    private isOffline: boolean;

    constructor(
        private weatherDataService: WeatherDataService) { }


    ngOnInit(): void {
        this.startTimers();
    }

    ngOnDestroy(): void {
        this.stopTimers();
    }
    /**
     * Starts all the timers.
     */
    private startTimers(): void {
        this.startRealtimeTimer();
        this.startRapidTimer();
        this.startLastUpdateTimer();
        this.isPaused = false;
        this.isOffline = false;
        this.updateCounter = 0;
    }
    /**
     * Stops all timers.
     */
    private stopTimers(): void {
        this.stopTimer(this.realtimeTimer);
        this.stopTimer(this.rapidTimer);
        this.stopTimer(this.lastUpdateTimer);
    }
    /**
     * Get the available units of measurement from the settings file.
     * @returns {Array<string>}
     */
    private getUnits(): Array<string> {
        return AppSettings.UNIT_TYPES;
    }

    /**
     * Starts a timer which calls setRealtimeData at an interval set in
     * AppSettings.REALTIME_INTERVAL, thus regularly updating the realtime
     * weather data displayed on the dashboard.
     */
    private startRealtimeTimer(): void {
        this.realtimeTimer = Observable.interval(
            AppSettings.REALTIME_INTERVAL * 1000).subscribe(
            time => {
                this.weatherDataService.setRealtimeData();
                this.updateCounter = this.updateCounter + 1;

            });
    }
    /**
     * Starts a timer which calls rapidUpdate at an interval set in
     * AppSettings.RAPID_INTERVAL, which rapidly updates weather data on
     * the dashboard.
     */
    private startRapidTimer(): void {
        this.rapidTimer = Observable.interval(
            AppSettings.RAPID_INTERVAL * 1000).subscribe(
            time => {
                this.weatherDataService.rapidUpdate();
            });
    }
    /**
     * Starts a timer which counts the number of seconds since the realtime
     * weather data was updated, and resets when an update is detected. This
     * function also pauses updates after a specified MAXIMUM_COUNT and if the
     * station is offline defined by MAX_OFFLINE_TIME in AppSettings.
     */
    private startLastUpdateTimer(): void {
        this.lastUpdateTimer = Observable.interval(1000).subscribe(
            ticks => {
                if (this.weatherDataService.getRealtimeData()) {
                    let currentTime = Date.now();
                    let time = new Date(this.weatherDataService.getRealtimeData().time);
                    if ((currentTime - time.getTime()) >=
                        (AppSettings.MAXIMUM_OFFLINE_TIME * 1000)) {
                        this.isOffline = true;
                        this.isPaused = true;
                        this.stopTimers();
                    } else if (this.updateCounter >= AppSettings.MAXIMUM_COUNT) {
                        this.isPaused = true;
                        this.stopTimers();
                    } else if (this.weatherDataService.getIsUpdated()) {
                        this.resetLastUpdateTimer();
                    } else {
                        this.secondsAgo = ticks;
                    }
                }
            });
    }
    /**
     * Fuction to restart the time since last update timer
     */
    private resetLastUpdateTimer(): void {
        this.stopTimer(this.lastUpdateTimer);
        this.startLastUpdateTimer();
    }

    /**
     * Function to stop a timer.
     */
    private stopTimer(timer: any): void {
        if (timer) {
            timer.unsubscribe();
        }
    }



}

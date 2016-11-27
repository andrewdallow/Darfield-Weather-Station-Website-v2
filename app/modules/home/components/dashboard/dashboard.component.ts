import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { WeatherDataService } from '../../../../shared/weather-data/weather-data.service';
import { SettingsService } from '../../../../shared/config/settings.service';
import { RealtimeGraphDataService } from '../../../../shared/realtime-sql-data/realtime-graph-data.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    providers: [RealtimeGraphDataService]
})

export class DashboardComponent implements OnInit, OnDestroy {
    public selectedUnit: string;
    public graphData: any;
    public settings: any;
    private secondsAgo: number;
    private updateCounter: number;
    private realtimeTimer: any;
    private rapidTimer: any;
    private lastUpdateTimer: any;
    private isPaused: boolean;
    private isOffline: boolean;

    constructor(
        private weatherDataService: WeatherDataService,
        private realtimeGraphDataService: RealtimeGraphDataService,
        private settingsService: SettingsService
    ) { }


    ngOnInit(): void {
        this.settingsService.config.then(
            (config: any) => {
                this.settings = config;
                this.selectedUnit = config.units[0];
                this.startTimers();
            });
    }

    ngOnDestroy(): void {
        this.stopTimers();
    }
    /**
     * Determine if the current data need to be converted to the
     * specfied units.
     * @param {string} unit unit type e.g. Metric, Imperial.
     */
    convertUnits(unit: string): void {
        this.selectedUnit = unit;
        if (unit === this.settings.units[0]) {
            this.weatherDataService.convertUnits(false);
        } else {
            this.weatherDataService.convertUnits(true);
        }

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
     * Starts a timer which calls setRealtimeData at an interval set in
     * settings.json, thus regularly updating the realtime
     * weather data displayed on the dashboard.
     */
    private startRealtimeTimer(): void {
        let timespan = this.settings.liveGraphsTimespan;
        this.updateGraphData(timespan);
        this.realtimeTimer = Observable.interval(
            this.settings.realtimeInterval * 1000).subscribe(
            time => {
                this.weatherDataService.setRealtimeData();
                this.updateGraphData(timespan);
                this.updateCounter = this.updateCounter + 1;
            });
    }
    /**
     * Get the most recent graph data for the specified time span.
     * @param {number} hours time span in hours
     */
    private updateGraphData(hours: number): void {
        this.realtimeGraphDataService.setGraphData(hours).then(
            () => {
                this.realtimeGraphDataService.getGraphData().subscribe(
                    (data: any) => {
                        this.graphData = data;
                    }
                );
            }
        );
    }
    /**
     * Starts a timer which calls rapidUpdate at an interval set in
     * settings.json, which rapidly updates weather data on
     * the dashboard.
     */
    private startRapidTimer(): void {
        this.rapidTimer = Observable.interval(
            this.settings.rapidInterval * 1000).subscribe(
            time => {
                this.weatherDataService.rapidUpdate();
            });
    }
    /**
     * Starts a timer which counts the number of seconds since the realtime
     * weather data was updated, and resets when an update is detected. This
     * function also pauses updates after a specified MAXIMUM_COUNT and if the
     * station is offline defined by MAX_OFFLINE_TIME in settings.json.
     */
    private startLastUpdateTimer(): void {
        this.lastUpdateTimer = Observable.interval(1000).subscribe(
            ticks => {
                if (this.weatherDataService.getRealtimeData()) {
                    let currentTime = Date.now();
                    let time = new Date(this.weatherDataService.getRealtimeData().time);
                    if ((currentTime - time.getTime()) >=
                        (this.settings.maxOfflineTime * 1000)) {
                        this.isOffline = true;
                        this.isPaused = true;
                        this.stopTimers();
                    } else if (this.updateCounter >= this.settings.maxUpdateCount) {
                        this.isPaused = true;
                        this.stopTimers();
                    } else if (this.weatherDataService.getIsUpdated()) {
                        this.resetLastUpdateTimer();
                        this.secondsAgo = 0;
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

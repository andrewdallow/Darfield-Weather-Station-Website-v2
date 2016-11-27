import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { ForecastDataService } from '../services/forecast-data.service';
import { SettingsService } from '../../../shared/config/settings.service';


@Component({
    moduleId: module.id,
    templateUrl: 'forecast.component.html',
    providers: []
})
export class ForecastComponent implements OnInit {
    public isLoading: boolean = true;
    public forecastData: any[] = [];
    private forecastSettings: any;

    constructor(
        private titleService: Title,
        private forecastDataService: ForecastDataService,
        private settingsService: SettingsService
    ) {
        this.settingsService.config.then(
            (config: any) => {
                this.forecastSettings = config.forecast;
            }
        );
    }

    ngOnInit(): void {
        this.getForecast();
    }

    private getForecast(): void {
        this.forecastDataService.setWUforcast().then(
            () => {
                this.forecastDataService.forcastData.subscribe(
                    (data: any) => {
                        let txt_forecast = data.forecast.txt_forecast.forecastday,
                            forecastday = data.forecast.simpleforecast.forecastday,
                            idx = 0;
                        for (let day of forecastday) {
                            if (day.period <= 7) {
                                txt_forecast[idx].temp = day.high.celsius;
                                txt_forecast[idx + 1].temp = day.low.celsius;
                                this.forecastData.push({
                                    forecastday: day,
                                    txt_forecast: [txt_forecast[idx], txt_forecast[idx + 1]]
                                });
                            }
                            idx += 2;
                            this.isLoading = false;
                        }
                    }
                );
            });
    }

    getIcon(forecast: any): any {
        let path: string;

        if (forecast.pop !== '0' && forecast.icon !== 'nt_clear' && forecast.icon !== 'clear') {
            path = this.forecastSettings.iconNameMap[forecast.icon][0] + forecast.pop;
        } else {
            path = this.forecastSettings.iconNameMap[forecast.icon][0];
        }
        return this.forecastSettings.iconsDirectory + path + this.forecastSettings.iconsExt;
    }

    getIconText(forecast: any): string {
        return this.forecastSettings.iconNameMap[forecast.icon][1];
    }

}

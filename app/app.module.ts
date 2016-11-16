import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { CollapseModule, DropdownModule } from 'ng2-bootstrap';
import { ChartModule } from 'angular2-highcharts';
import { HttpModule } from '@angular/http';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { WeatherAppComponent } from './modules/core/weather-app.component';

import {
    ForecastComponent, AboutComponent
} from './modules/index';

import { HomeModule } from './modules/home/home.module';
import { WebcamModule } from './modules/webcam/webcam.module';
import { RecentGraphsModule } from './modules/recent-graphs/recent-graphs.module';
import { HistoryModule } from './modules/history/history.module';


import { SharedModule } from './shared/shared.module';

import { routing } from './app.routing';
declare var require: any;
const Highcharts = require('highcharts/highstock.src');
const HighchartsMore = require('highcharts/highcharts-more');
HighchartsMore(Highcharts);

@NgModule({
    imports: [
        HttpModule,
        FormsModule,
        BrowserModule,
        CollapseModule,
        DropdownModule,
        ChartModule,
        routing,
        HomeModule,
        WebcamModule,
        RecentGraphsModule,
        HistoryModule,
        SharedModule.forRoot()
    ],
    declarations: [
        WeatherAppComponent,
        ForecastComponent,
        AboutComponent
    ],
    bootstrap: [
        WeatherAppComponent
    ],
    providers: [
        Title
    ]
})
export class AppModule { }

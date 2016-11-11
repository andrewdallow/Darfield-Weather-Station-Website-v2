import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { CollapseModule, DropdownModule } from 'ng2-bootstrap';
import { ChartModule } from 'angular2-highcharts';
import { Ng2PaginationModule } from 'ng2-pagination';
import { HttpModule } from '@angular/http';

import { WeatherAppComponent } from './components/core/weather-app.component';

import {
    HomeComponent, DashboardComponent,
    TemperatureComponent, ThermometerComponent, LiveTemperatureGraphComponent,
    LiveWindGraphComponent, WindComponent, WindVaneComponent, RainComponent,
    LiveRainfallGraphComponent, BarometerComponent, WeatherDataService,
    ExtremesComponent, Graphs24HrComponent, Temperature24HrComponent,
    RainBoar24HrComponent, WebcamComponent, RecentGraphsComponent,
    HistoricGraphsComponent, RecordsComponent, NoaaReportsComponent,
    ForecastComponent, AboutComponent
} from './components/index';

import { HighlighterDirective } from './shared/directives/highlighter.directive';
import { TrendDirective } from './shared/directives/trend.directive';
import { UnitConverterPipe } from './shared/pipes/unit-converter.pipe';

import { TimeService } from './shared/time.service';
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
        Ng2PaginationModule
    ],
    declarations: [
        WeatherAppComponent,
        HomeComponent,

        DashboardComponent,
        TemperatureComponent,
        ThermometerComponent,
        LiveTemperatureGraphComponent,

        WindComponent,
        WindVaneComponent,
        LiveWindGraphComponent,
        BarometerComponent,
        RainComponent,
        LiveRainfallGraphComponent,

        ExtremesComponent,

        Graphs24HrComponent,
        Temperature24HrComponent,
        RainBoar24HrComponent,

        WebcamComponent,
        RecentGraphsComponent,
        HistoricGraphsComponent,
        RecordsComponent,
        NoaaReportsComponent,
        ForecastComponent,
        AboutComponent,

        HighlighterDirective,
        TrendDirective,
        UnitConverterPipe
    ],
    bootstrap: [
        WeatherAppComponent
    ],
    providers: [
        TimeService,
        WeatherDataService,
        Title
    ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule, DropdownModule } from 'ng2-bootstrap';
import { ChartModule } from 'angular2-highcharts';
import { HttpModule } from '@angular/http';

import {
    WeatherAppComponent, HomeComponent, DashboardComponent,
    TemperatureComponent, ThermometerComponent, LiveTemperatureGraphComponent,
    LiveWindGraphComponent, WindComponent, WindVaneComponent, RainComponent,
    LiveRainfallGraphComponent, BarometerComponent, WeatherDataService,
    ExtremesComponent, Graphs24HrComponent, Temperature24HrComponent,
    RainBoar24HrComponent, WebcamComponent, MapComponent, RecentGraphsComponent,
    HistoricGraphsComponent, RecordsComponent, NoaaReportsComponent,
    ForecastComponent, AboutComponent
} from './components';
import { HighlighterDirective } from './shared/directives/highlighter.directive';
import { TrendDirective } from './shared/directives/trend.directive';

import { TimeService } from './shared/time.service';
import { routing } from './app.routing';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        CollapseModule,
        DropdownModule,
        ChartModule,
        routing
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
        MapComponent,
        RecentGraphsComponent,
        HistoricGraphsComponent,
        RecordsComponent,
        NoaaReportsComponent,
        ForecastComponent,
        AboutComponent,
        HighlighterDirective,
        TrendDirective
    ],
    bootstrap: [
        WeatherAppComponent
    ],
    providers: [
        TimeService,
        WeatherDataService
    ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule, DropdownModule } from 'ng2-bootstrap';
import { ChartModule } from 'angular2-highcharts';
import { HttpModule } from '@angular/http';

import {
    WeatherAppComponent, HomeComponent, DashboardComponent, TemperatureComponent, ThermometerComponent, WindComponent,
    RainComponent, BarometerComponent, WeatherDataService, ExtremesComponent,
    Graphs24HrComponent, WebcamComponent, MapComponent, RecentGraphsComponent,
    HistoricGraphsComponent, RecordsComponent, NoaaReportsComponent,
    ForecastComponent, AboutComponent
} from './components';
import { HighlighterDirective } from './shared/directives/highlighter.directive';
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
        WindComponent,
        BarometerComponent,
        RainComponent,
        ExtremesComponent,
        Graphs24HrComponent,
        WebcamComponent,
        MapComponent,
        RecentGraphsComponent,
        HistoricGraphsComponent,
        RecordsComponent,
        NoaaReportsComponent,
        ForecastComponent,
        AboutComponent,
        HighlighterDirective
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

import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ChartModule } from 'angular2-highcharts';
import { HomeComponent } from './components/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TemperatureComponent } from './components/dashboard/temperature/temperature.component';
import { ThermometerComponent } from './components/dashboard/temperature/thermometer.component';
import { LiveTemperatureGraphComponent } from './components/dashboard/temperature/live-temperature-graph.component';
import { WindComponent } from './components/dashboard/wind/wind.component';
import { WindVaneComponent } from './components/dashboard/wind/wind-vane.component';
import { LiveWindGraphComponent } from './components/dashboard/wind/live-wind-graph.component';
import { BarometerComponent } from './components/dashboard/barometer/barometer.component';
import { RainComponent } from './components/dashboard/rain/rain.component';
import { LiveRainfallGraphComponent } from './components/dashboard/rain/live-rainfall-graph.component';
import { ExtremesComponent } from './components/extremes/extremes.component';
import { Graphs24HrComponent } from './components/graph/graphs-24hr.component';
import { Temperature24HrComponent } from './components/graph/temperature-24hr.component';
import { RainBaro24HrComponent } from './components/graph/rain-baro-24hr.component';


@NgModule({
    imports: [
        ChartModule,
        SharedModule
    ],
    declarations: [
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
        RainBaro24HrComponent,
    ],
    exports: [HomeComponent],
    providers: []
})

export class HomeModule { }

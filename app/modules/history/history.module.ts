import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ChartModule } from 'angular2-highcharts';
import { CollapseModule, DropdownModule } from 'ng2-bootstrap';

import { HistoryComponent } from './components/history.component';
import { MonthlyComponent } from './components/monthly/monthly.component';
import { DateControlsComponent } from './components/controls/date-controls.component';
import { MonthlyTemperatureChartComponent } from './components/monthly/monthly-temperature-chart.component';
import { MonthlyRainfallChartComponent } from './components/monthly/monthly-rainfall-chart.component';
import { YearlyComponent } from './components/yearly/yearly.component';
import { YearlyTemperatureChartComponent } from './components/yearly/yearly-temperature-chart.component';
import { YearlyRainfallChartComponent } from './components/yearly/yearly-rainfall-chart.component';
import { RecordsComponent } from './components/records/records.component';
import { ClimateComponent } from './components/climate/climate.component';
import { ClimateChartComponent } from './components/climate/climate-chart.component';

import { HistoricDataService } from './services/historic-data.service';


@NgModule({
    imports: [
        ChartModule,
        CollapseModule,
        DropdownModule,
        SharedModule
    ],
    declarations: [
        HistoryComponent,
        MonthlyComponent,
        DateControlsComponent,
        MonthlyTemperatureChartComponent,
        MonthlyRainfallChartComponent,
        YearlyComponent,
        YearlyTemperatureChartComponent,
        YearlyRainfallChartComponent,
        RecordsComponent,
        ClimateComponent,
        ClimateChartComponent
    ],
    exports: [
        HistoryComponent,
        MonthlyComponent,
        YearlyComponent,
        RecordsComponent,
        ClimateComponent
    ],
    providers: [HistoricDataService]
})

export class HistoryModule { }

import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ChartModule } from 'angular2-highcharts';
import { HistoryComponent } from './components/history.component';
import { MonthlyComponent } from './components/monthly/monthly.component';
import { DateControlsComponent } from './components/controls/date-controls.component';
import { MonthlyTemperatureChartComponent } from './components/monthly/monthly-temperature-chart.component';
import { MonthlyRainfallChartComponent } from './components/monthly/monthly-rainfall-chart.component';
import { YearlyComponent } from './components/yearly/yearly.component';
import { YearlyTemperatureChartComponent } from './components/yearly/yearly-temperature-chart.component';
import { YearlyRainfallChartComponent } from './components/yearly/yearly-rainfall-chart.component';
import { RecordsComponent } from './components/records/records.component';

import { HistoricDataService } from './services/historic-data.service';


@NgModule({
    imports: [
        ChartModule,
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
        RecordsComponent
    ],
    exports: [
        HistoryComponent,
        MonthlyComponent,
        YearlyComponent,
        RecordsComponent
    ],
    providers: [HistoricDataService]
})

export class HistoryModule { }

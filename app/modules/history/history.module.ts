import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ChartModule } from 'angular2-highcharts';
import { HistoryComponent } from './components/history.component';

@NgModule({
    imports: [
        ChartModule,
        SharedModule
    ],
    declarations: [
        HistoryComponent
    ],
    exports: [HistoryComponent],
    providers: []
})

export class HistoryModule { }

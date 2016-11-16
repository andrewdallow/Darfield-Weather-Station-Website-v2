import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ChartModule } from 'angular2-highcharts';

import { RecentGraphsComponent } from './components/recent-graphs.component';


@NgModule({
    imports: [
        ChartModule,
        SharedModule
    ],
    declarations: [
        RecentGraphsComponent
    ],
    exports: [RecentGraphsComponent],
    providers: []
})

export class RecentGraphsModule { }

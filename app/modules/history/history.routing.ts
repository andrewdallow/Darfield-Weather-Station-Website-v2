import { Route } from '@angular/router';
import * as moment from 'moment';

import { HistoryComponent } from './components/history.component';
import { MonthlyComponent } from './components/monthly/monthly.component';
import { YearlyComponent } from './components/yearly/yearly.component';
import { RecordsComponent } from './components/records/records.component';

export const HistoryRoutes: Route[] = [
    {
        path: 'history',
        component: HistoryComponent,
        children: [
            {
                path: 'monthly/:year/:month',
                component: MonthlyComponent
            },
            {
                path: 'yearly/:year',
                component: YearlyComponent
            },
            {
                path: 'records',
                component: RecordsComponent
            },
            {
                path: 'monthly',
                redirectTo: 'monthly/' + moment().format('YYYY')
                + '/' + moment().format('MMMM'),
                pathMatch: 'full'
            },
            {
                path: 'yearly',
                redirectTo: 'yearly/' + moment().format('YYYY'),
                pathMatch: 'full'
            }
        ]
    },
    // {
    //     path: 'records',
    //     component: RecordsComponent,
    // },
    // {
    //     path: 'noaa-style-reports',
    //     component: NoaaReportsComponent,
    // }
];

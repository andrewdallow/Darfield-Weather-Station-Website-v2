import { Route } from '@angular/router';
import { HistoryComponent } from './components/history.component';

export const HistoryRoutes: Route[] = [
    {
        path: 'history',
        component: HistoryComponent
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

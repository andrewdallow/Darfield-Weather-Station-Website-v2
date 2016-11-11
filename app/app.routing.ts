import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AppSettings } from './config/settings';

import {
    HomeComponent, WebcamComponent, RecentGraphsComponent,
    HistoricGraphsComponent, RecordsComponent, NoaaReportsComponent,
    ForecastComponent, AboutComponent
} from './components/index';


const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'webcam',
        component: WebcamComponent,
    },
    {
        path: 'graphs',
        component: RecentGraphsComponent,
    },
    {
        path: 'historic-graphs',
        component: HistoricGraphsComponent,
    },
    {
        path: 'records',
        component: RecordsComponent,
    },
    {
        path: 'noaa-style-reports',
        component: NoaaReportsComponent,
    },
    {
        path: 'forecast',
        component: ForecastComponent,
    },
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

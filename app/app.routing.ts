import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AppSettings } from './shared/config/settings';

import {
    ForecastComponent, AboutComponent
} from './modules/index';

import { HomeRoutes } from './modules/home/home.routing';
import { WebcamRoutes } from './modules/webcam/webcam.routing';
import { RecentGraphsRoutes } from './modules/recent-graphs/recent-graphs.routing';
import { HistoryRoutes } from './modules/history/history.routing';



const appRoutes: Routes = [
    ...HomeRoutes,
    ...WebcamRoutes,
    ...RecentGraphsRoutes,
    ...HistoryRoutes,
    {
        path: 'forecast',
        component: ForecastComponent,
    },
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: '*',
        redirectTo: '',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

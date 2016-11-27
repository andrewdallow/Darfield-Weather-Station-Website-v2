import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeRoutes } from './modules/home/home.routing';
import { WebcamRoutes } from './modules/webcam/webcam.routing';
import { RecentGraphsRoutes } from './modules/recent-graphs/recent-graphs.routing';
import { HistoryRoutes } from './modules/history/history.routing';
import { ForecastRoutes } from './modules/forecast/forecast.routing';
import { AboutRoutes } from './modules/about/about.routing';

const appRoutes: Routes = [
    ...HomeRoutes,
    ...WebcamRoutes,
    ...RecentGraphsRoutes,
    ...HistoryRoutes,
    ...ForecastRoutes,
    ...AboutRoutes,
    {
        path: '*',
        redirectTo: '',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

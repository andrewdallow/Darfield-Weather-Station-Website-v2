import { Route } from '@angular/router';
import { RecentGraphsComponent } from './components/recent-graphs.component';

export const RecentGraphsRoutes: Route[] = [
    {
        path: 'graphs/:tab/:hours',
        component: RecentGraphsComponent,
    },
    {
        path: 'graphs',
        redirectTo: 'graphs/compare/12',
        pathMatch: 'full'
    }
];

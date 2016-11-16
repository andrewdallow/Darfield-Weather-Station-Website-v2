import { Route } from '@angular/router';
import { WebcamComponent } from './components/webcam.component';

export const WebcamRoutes: Route[] = [
    {
        path: 'webcam/:day',
        component: WebcamComponent,
    },
    {
        path: 'webcam',
        redirectTo: '/webcam/today',
        pathMatch: 'full'
    }
];

import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { AboutComponent } from './components/about.component';


@NgModule({
    imports: [
        SharedModule

    ],
    declarations: [
        AboutComponent
    ],
    exports: [AboutComponent],
    providers: []
})

export class AboutModule { }

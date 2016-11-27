import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ForecastDataService } from './services/forecast-data.service';
import { ForecastComponent } from './components/forecast.component';


@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        ForecastComponent
    ],
    exports: [ForecastComponent],
    providers: [ForecastDataService]
})

export class ForecastModule { }

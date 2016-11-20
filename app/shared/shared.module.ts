import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { WeatherDataService } from './weather-data/weather-data.service';

import { HighlighterDirective } from './directives/highlighter.directive';
import { TrendDirective } from './directives/trend.directive';
import { UnitConverterPipe } from './pipes/unit-converter.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { CompaseTextPipe } from './pipes/compase-text.pipe';



@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [
        HighlighterDirective,
        TrendDirective,
        UnitConverterPipe,
        CapitalizePipe,
        CompaseTextPipe
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        HighlighterDirective,
        TrendDirective,
        UnitConverterPipe,
        CapitalizePipe,
        CompaseTextPipe
    ]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [WeatherDataService]
        };
    }
}

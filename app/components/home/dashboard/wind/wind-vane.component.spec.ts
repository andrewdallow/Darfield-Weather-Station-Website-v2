import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Highcharts, ChartModule } from 'angular2-highcharts';
require('highcharts/highcharts-more.js')(Highcharts);

import { WindVaneComponent } from './wind-vane.component';
import { WeatherDataService } from '../../weather-data/weather-data.service';
import { TimeService } from '../../../../shared/time.service';

describe('WindVaneComponent', () => {
    let fixture: ComponentFixture<WindVaneComponent>;
    let component: WindVaneComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WindVaneComponent
            ],
            imports: [HttpModule, ChartModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [WeatherDataService, TimeService]
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WindVaneComponent);
        component = fixture.componentInstance;
    });

    it('should instantiate component', () => {
        expect(component instanceof WindVaneComponent).toBe(true, 'should create WindVaneComponent');
    });

});

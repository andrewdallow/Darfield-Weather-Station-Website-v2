import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import {  ChartModule } from 'angular2-highcharts';

import { WindVaneComponent } from './wind-vane.component';
import { WeatherDataService } from '../../../../../shared/weather-data/weather-data.service';

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
            providers: [WeatherDataService]
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

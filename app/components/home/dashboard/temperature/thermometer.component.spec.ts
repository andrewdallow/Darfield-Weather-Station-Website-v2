import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-highcharts';


import { ThermometerComponent } from './thermometer.component';
import { WeatherDataService } from '../../weather-data/weather-data.service';
import { TimeService } from '../../../../shared/time.service';

describe('ThermometerComponent', () => {
    let fixture: ComponentFixture<ThermometerComponent>;
    let component: ThermometerComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ThermometerComponent
            ],
            imports: [HttpModule, ChartModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [WeatherDataService, TimeService]
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThermometerComponent);
        component = fixture.componentInstance;
    });

    it('should instantiate component', () => {
        expect(component instanceof ThermometerComponent).toBe(true, 'should create ThermometerComponent');
    });

});

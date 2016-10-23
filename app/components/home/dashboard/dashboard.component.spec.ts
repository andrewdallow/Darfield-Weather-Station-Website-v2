import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';

import { DashboardComponent } from './dashboard.component';
import { WeatherDataService } from '../weather-data/weather-data.service';
import { TimeService } from '../../../shared/time.service';

describe('DashboardComponent holding live weather data', () => {
    let fixture: ComponentFixture<DashboardComponent>;
    let component: DashboardComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DashboardComponent
            ],
            imports: [HttpModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [WeatherDataService, TimeService]
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
    });

    it('should instantiate component', () => {
        expect(component instanceof DashboardComponent).toBe(true, 'should create DashboardComponent');
    });




});

import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';

import { BarometerComponent } from './barometer.component';
import { WeatherDataService } from '../../../../../shared/weather-data/weather-data.service';

describe('BarometerComponent', () => {
    let fixture: ComponentFixture<BarometerComponent>;
    let component: BarometerComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BarometerComponent
            ],
            imports: [HttpModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [WeatherDataService]
        }).compileComponents();


    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BarometerComponent);
        component = fixture.componentInstance;
    });

    it('should instantiate component', () => {
        expect(component instanceof BarometerComponent).toBe(true, 'should create BarometerComponent');
    });


});

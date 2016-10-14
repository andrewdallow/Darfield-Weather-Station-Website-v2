import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';

import { TemperatureComponent } from './temperature.component';
import { WeatherDataService } from '../../weather-data/weather-data.service';
import { TimeService } from '../../../../shared/time.service';

describe('TemperatureComponent', () => {
    let fixture: ComponentFixture<TemperatureComponent>;
    let component: TemperatureComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TemperatureComponent
            ],
            imports: [HttpModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [WeatherDataService, TimeService]
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TemperatureComponent);
        component = fixture.componentInstance;
    });

    it('should instantiate component', () => {
        expect(component instanceof TemperatureComponent).toBe(true, 'should create TemperatureComponent');
    });


});

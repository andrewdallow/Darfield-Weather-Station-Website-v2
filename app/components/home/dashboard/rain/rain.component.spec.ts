import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';

import { RainComponent } from './rain.component';
import { WeatherDataService } from '../../weather-data/weather-data.service';
import { TimeService } from '../../../../shared/time.service';

describe('RainComponent', () => {
    let fixture: ComponentFixture<RainComponent>;
    let component: RainComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RainComponent
            ],
            imports: [HttpModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [WeatherDataService, TimeService]
        }).compileComponents();


    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RainComponent);
        component = fixture.componentInstance;
    });

    it('should instantiate component', () => {
        expect(component instanceof RainComponent).toBe(true, 'should create RainComponent');
    });


});

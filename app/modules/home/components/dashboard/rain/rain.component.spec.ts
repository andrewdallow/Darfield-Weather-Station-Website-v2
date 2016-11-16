import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';

import { RainComponent } from './rain.component';
import { WeatherDataService } from '../../../../../shared/weather-data/weather-data.service';

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
            providers: [WeatherDataService]
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

import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';

import { WindComponent } from './wind.component';
import { WeatherDataService } from '../../../../../shared/weather-data/weather-data.service';

describe('WindComponent', () => {
    let fixture: ComponentFixture<WindComponent>;
    let component: WindComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WindComponent
            ],
            imports: [HttpModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [WeatherDataService]
        }).compileComponents();


    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WindComponent);
        component = fixture.componentInstance;
    });

    it('should instantiate component', () => {
        expect(component instanceof WindComponent).toBe(true, 'should create WindComponent');
    });


});

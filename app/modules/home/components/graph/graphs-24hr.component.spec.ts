import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';

import { WeatherDataService } from '../../../../shared/weather-data/weather-data.service';
import { Graphs24HrComponent } from './graphs-24hr.component';


describe('Graphs24HrComponent', () => {
    let fixture: ComponentFixture<Graphs24HrComponent>;
    let component: Graphs24HrComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                Graphs24HrComponent
            ],
            imports: [HttpModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [WeatherDataService]
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Graphs24HrComponent);
        component = fixture.componentInstance;
    });

    it('should instantiate component', () => {
        expect(component instanceof Graphs24HrComponent).toBe(true, 'should create Graphs24HrComponent');
    });


});

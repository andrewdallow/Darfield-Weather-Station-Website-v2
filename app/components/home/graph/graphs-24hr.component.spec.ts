import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';

import { Graphs24HrComponent, WeatherDataService } from '../../../components';
import { TimeService } from '../../../shared/time.service';

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
            providers: [WeatherDataService, TimeService]
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

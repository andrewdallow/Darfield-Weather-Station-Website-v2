import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { ExtremesComponent } from './extremes.component';
import { WeatherDataService } from '../weather-data/weather-data.service';
import { TimeService } from '../../../shared/time.service';

describe('ExtremesComponent', () => {
    let fixture: ComponentFixture<ExtremesComponent>;
    let component: ExtremesComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ExtremesComponent
            ],
            imports: [HttpModule],
            schemas: [],
            providers: [WeatherDataService, TimeService]
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExtremesComponent);
        component = fixture.componentInstance;
    });

    it('should instantiate component', () => {
        expect(component instanceof ExtremesComponent).toBe(true, 'should create ExtremesComponent');
    });


});

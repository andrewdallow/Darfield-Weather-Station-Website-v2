import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
    CollapseModule,
    DropdownModule
} from 'ng2-bootstrap/ng2-bootstrap';

import { WeatherAppComponent } from './weather-app.component';

describe('WeatherAppComponent with chrome reources', () => {
    let fixture: ComponentFixture<WeatherAppComponent>;
    let component: WeatherAppComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WeatherAppComponent
            ],
            imports: [
                CollapseModule,
                DropdownModule,
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();


    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WeatherAppComponent);
        component = fixture.componentInstance;
    });

    it('should instantiate component', () => {
        expect(component instanceof WeatherAppComponent).toBe(true, 'should create WeatherAppComponent');
    });

    it('should open dropdown menu', () => {
        fixture.debugElement.query(By.css('[dropdownToggle]')).nativeElement.click();
        fixture.detectChanges();
        expect(component.status.isopen).toBe(true, 'should expand menu');

    });

    it('Should close dropdown menu', () => {
        fixture.debugElement.query(By.css('[dropdownToggle]')).nativeElement.click();
        fixture.detectChanges();
        fixture.debugElement.query(By.css('[dropdownToggle]')).nativeElement.click();
        fixture.detectChanges();
        expect(component.status.isopen).toBe(false, 'should collapse menu');
    });


});

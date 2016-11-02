import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TrendDirective } from './trend.directive';

@Component({
    template: '<span class="glyphicon" trend="{{value}}"></span>{{value}}'
})
class MockComponent { public value: number = 0; }


describe('Trend Directive', () => {
    let fixture: ComponentFixture<MockComponent>;
    let component: MockComponent;
    let de: DebugElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MockComponent,
                TrendDirective
            ]
        }).createComponent(MockComponent);
        fixture = TestBed.createComponent(MockComponent);
        component = fixture.componentInstance;
    });

    it('no change should have minus icon', () => {
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('span'));
        expect(de.nativeElement.className === 'glyphicon glyphicon-minus')
            .toBe(true, 'should be minus icon');

    });

    it('positive number should have up arrow', fakeAsync(() => {
        component.value = 2;
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('span'));
        expect(de.nativeElement.className === 'glyphicon glyphicon-arrow-up')
            .toBe(true, 'should be up arrow');

    }));

    it('negative number should have down arrow', fakeAsync(() => {
        component.value = -2;
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('span'));
        expect(de.nativeElement.className === 'glyphicon glyphicon-arrow-down')
            .toBe(true, 'should be down arrow');
        console.log(de);
    }));
    it('changing from up to down', fakeAsync(() => {
        component.value = 2;
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('span'));
        expect(de.nativeElement.className === 'glyphicon glyphicon-arrow-up')
            .toBe(true, 'should be up arrow');
        component.value = -2;
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('span'));
        expect(de.nativeElement.className === 'glyphicon glyphicon-arrow-down')
            .toBe(true, 'should be down arrow');

    }));


});

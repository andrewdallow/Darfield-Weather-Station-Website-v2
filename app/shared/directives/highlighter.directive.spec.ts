import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HighlighterDirective } from './highlighter.directive';

@Component({
    template: '<h1 highlighter="{{value}}">{{value}}</h1>'
})
class MockComponent { public value: number = 1; }


describe('Highlighter Directive', () => {
    let fixture: ComponentFixture<MockComponent>;
    let component: MockComponent;
    let de: DebugElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MockComponent,
                HighlighterDirective
            ]
        }).createComponent(MockComponent);
        fixture = TestBed.createComponent(MockComponent);
        component = fixture.componentInstance;
    });

    it('initial value with no style', () => {
        de = fixture.debugElement.query(By.css('h1'));
        expect(de.nativeElement.className === '').toBe(true,
            'should be no initial class');
    });

    it('changed value should be highlighted', fakeAsync(() => {
        component.value = 2;
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('h1'));
        expect(de.nativeElement.className === 'highlight').toBe(true, 'should contain highlight class');
        tick(2000);
    }));

    it('unchanged value should not be highlighted', fakeAsync(() => {
        component.value = 1;
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('h1'));
        expect(de.nativeElement.className === 'highlight').toBe(true, 'should contain highlight class');
        tick(2000);
    }));

    it('highlighted value should revert', fakeAsync(() => {

        component.value = 2;
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('h1'));
        expect(de.classes['highlight']).toBe(true, 'should contain highlight class after 1s');
        tick(2500);
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('h1'));
        expect(de.classes['highlight']).toBe(false, 'should not contain highlight class after 2s');

    }));

});

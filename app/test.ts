import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { fakeAsync, async, inject, TestBed, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    template: `
<router-outlet></router-outlet>
`
})
class RoutingComponent { }

@Component({
    template: ''
})
class DummyComponent { }

describe('component: RoutingComponent', () => {
    let location: Location, router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([
                { path: 'home', component: DummyComponent }
            ])],
            declarations: [RoutingComponent, DummyComponent]
        });
    });

    beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
        location = _location;
        router = _router;
    }));

    it('should go home', async(() => {
        let fixture = TestBed.createComponent(RoutingComponent);
        fixture.detectChanges();
        router.navigate(['/home']).then(() => {
            expect(location.path()).toBe('/home');
            console.log('after expect');
        });
    }));
});

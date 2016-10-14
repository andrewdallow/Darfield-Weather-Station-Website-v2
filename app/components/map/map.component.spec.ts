import { TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';

describe('MapComponent with TCB', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent]
    });

  });

  it('should instantiate component', () => {

    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(MapComponent);
      expect(fixture.componentInstance instanceof MapComponent).toBe(true, 'should create MapComponent');
    });

  });
});

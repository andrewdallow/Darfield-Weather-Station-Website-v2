import { TestBed } from '@angular/core/testing';

import { ForecastComponent } from './forecast.component';

describe('ForecastComponent with TCB', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForecastComponent]
    });
  });

  it('should instantiate component', () => {

    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(ForecastComponent);
      expect(fixture.componentInstance instanceof ForecastComponent).toBe(true, 'should create ForecastComponent');
    });

  });
});

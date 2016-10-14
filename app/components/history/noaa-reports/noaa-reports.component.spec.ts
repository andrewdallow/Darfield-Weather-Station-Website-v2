import { TestBed } from '@angular/core/testing';

import { NoaaReportsComponent } from './noaa-reports.component';

describe('NoaaReportsComponent with TCB', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoaaReportsComponent]
    });
  });

  it('should instantiate component', () => {

    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(NoaaReportsComponent);
      expect(fixture.componentInstance instanceof NoaaReportsComponent).toBe(true, 'should create NoaaReportsComponent');
    });

  });
});

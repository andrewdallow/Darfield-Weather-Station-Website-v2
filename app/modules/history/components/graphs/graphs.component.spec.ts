import { TestBed } from '@angular/core/testing';

import { HistoricGraphsComponent } from './graphs.component';

describe('HistoricGraphsComponent with TCB', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricGraphsComponent]
    });
  });

  it('should instantiate component', () => {

    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(HistoricGraphsComponent);
      expect(fixture.componentInstance instanceof HistoricGraphsComponent).toBe(true, 'should create HistoricGraphsComponent');
    });

  });
});

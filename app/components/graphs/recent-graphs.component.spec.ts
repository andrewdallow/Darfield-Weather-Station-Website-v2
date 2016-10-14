import { TestBed } from '@angular/core/testing';

import { RecentGraphsComponent } from './recent-graphs.component';

describe('RecentGraphsComponent with TCB', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentGraphsComponent]
    });

  });

  it('should instantiate component', () => {

    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(RecentGraphsComponent);
      expect(fixture.componentInstance instanceof RecentGraphsComponent).toBe(true, 'should create RecentGraphsComponent');
    });

  });
});

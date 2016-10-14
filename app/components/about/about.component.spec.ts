import { TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent with TCB', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent]
    });

  });

  it('should instantiate component', () => {

    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(AboutComponent);
      expect(fixture.componentInstance instanceof AboutComponent).toBe(true, 'should create AboutComponent');
    });

  });
});

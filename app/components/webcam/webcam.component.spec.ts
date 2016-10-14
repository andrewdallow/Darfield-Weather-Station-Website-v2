import { TestBed } from '@angular/core/testing';

import { WebcamComponent } from './webcam.component';

describe('WebcamComponent with TCB', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamComponent]
    });

  });

  it('should instantiate component', () => {

    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(WebcamComponent);
      expect(fixture.componentInstance instanceof WebcamComponent).toBe(true, 'should create WebcamComponent');
    });

  });
});

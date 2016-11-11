import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RecordsComponent } from './records.component';

describe('RecordsComponent with TCB', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RecordsComponent],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    it('should instantiate component', () => {

        TestBed.compileComponents().then(() => {
            let fixture = TestBed.createComponent(RecordsComponent);
            expect(fixture.componentInstance instanceof RecordsComponent).toBe(true, 'should create RecordsComponent');
        });

    });
});

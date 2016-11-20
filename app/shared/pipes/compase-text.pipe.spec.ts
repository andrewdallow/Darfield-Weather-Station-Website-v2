import { CompaseTextPipe } from './compase-text.pipe';


describe('CompaseTextPipe', () => {
    let pipe = new CompaseTextPipe();

    it('transforms 0 to N', () => {
        expect(pipe.transform('0'))
            .toBe('N');
    });
    it('transforms 180 to S', () => {
        expect(pipe.transform('180'))
            .toBe('S');
    });
});

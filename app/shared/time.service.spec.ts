import { TimeService } from './time.service';

describe('TimeService', () => {
    let testService: TimeService;
    let time = '10-Jul-2016 09:23:04';

    beforeEach(() => {
        testService = new TimeService();
    });

    it('should instantiate component', () => {
        expect(testService instanceof TimeService).toBe(true, 'should create TimeService');
    });

    it('should return date string', () => {
        let timestamp = (new Date(time)).getTime();
        console.log(testService.unixTimeConverter(timestamp));
        expect(testService.unixTimeConverter(timestamp)).toEqual(time);

    });



});

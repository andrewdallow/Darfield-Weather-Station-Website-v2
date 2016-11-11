import { UnitConverterPipe } from './unit-converter.pipe';


describe('UnitConverterPipe', () => {
    let pipe = new UnitConverterPipe();
    let data = {
        outTemp: { value: '10.1', unit: '&degC' },
        tempchangehour: { value: '-2.1', unit: '&degC/hr' },
        windSpeed: { value: '5', unit: ' km/h' },
        rainRate: { value: '2.4', unit: ' mm/hr' },
        rainSumDay: { value: '10.0', unit: ' mm' },
        barometer: { value: '1005.0', unit: ' hPa' },
        barometerTrendData: { value: '0.5', unit: ' hPa/hr' }
    };

    it('transforms C to F', () => {
        expect(pipe.transform(data.outTemp, true))
            .toBe('50.2<span>&degF</span>');
    });
    it('transforms stay the same', () => {
        expect(pipe.transform(data.outTemp, false))
            .toBe('10.1<span>&degC</span>');
    });
    it('adds class to units', () => {
        expect(pipe.transform(data.outTemp, false, 'units-big'))
            .toBe('10.1<span class="units-big">&degC</span>');
    });
    it('transforms C/hr to F/hr', () => {
        expect(pipe.transform(data.tempchangehour, true))
            .toBe('-3.8<span>&degF/hr</span>');
    });
    it('transforms km/h to mph', () => {
        expect(pipe.transform(data.windSpeed, true))
            .toBe('3<span> mph</span>');
    });
    it('transforms mm/hr to in/hr', () => {
        expect(pipe.transform(data.rainRate, true))
            .toBe('0.1<span> in/hr</span>');
    });
    it('transforms mm to in', () => {
        expect(pipe.transform(data.rainSumDay, true))
            .toBe('0.4<span> in</span>');
    });
    it('transforms hPa to inHg', () => {
        expect(pipe.transform(data.barometer, true))
            .toBe('29.68<span> inHg</span>');
    });
    it('transforms hPa/hr to inHg/hr', () => {
        expect(pipe.transform(data.barometerTrendData, true))
            .toBe('0.01<span> inHg/hr</span>');
    });
});

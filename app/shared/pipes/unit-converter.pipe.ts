import { Pipe, PipeTransform } from '@angular/core';

interface Measurement {
    value: string;
    unit: string;
}

@Pipe({
    name: 'unitConverter',
    pure: false
})
/**
 * Transform given measure from metric to imperial or vice versa, but
 * only if flagged to be converted.
 * @param  {Measurement} measure raw measurment
 * @param  {boolean}     convert true for convert, false if not.
 * @return {string}              converted measurement
 */
export class UnitConverterPipe implements PipeTransform {
    private units = {
        ' km': [' mi', (x: number) => {
            return Math.round(x * 0.621371);
        }],
        ' km/h': [' mph', (x: number) => {
            return Math.round(x / 1.60934);
        }],
        ' mi': [' km', (x: number) => {
            return Math.round(x * 1.60934);
        }],
        ' mph': [' km/h', (x: number) => {
            return Math.round(x * 1.60934);
        }],
        ' mm': [' in', (x: number) => {
            return (Math.round((x * 0.0393701) * 10) / 10).toFixed(1);
        }],
        ' mm/hr': [' in/hr', (x: number) => {
            return (Math.round((x * 0.0393701) * 10) / 10).toFixed(1);
        }],
        ' in': [' mm', (x: number) => {
            return Math.round((x * 25.4) * 10) / 10;
        }],
        ' in/hr': [' mm/hr', (x: number) => {
            return Math.round((x * 25.4) * 10) / 10;
        }],
        ' hPa': [' inHg', (x: number) => {
            return Math.round((x * 0.02952998751) * 100) / 100;
        }],
        ' hPa/hr': [' inHg/hr', (x: number) => {
            return Math.floor((x * 0.02952998751) * 100) / 100;
        }],
        ' inHg': [' hPa', (x: number) => {
            return Math.round((x * 3386.39) * 1000) / 1000;
        }],
        '&degF': ['&degC', (x: number) => {
            return (Math.round(((x - 32.0) * (5.0 / 9.0)) * 10) / 10).toFixed(1);
        }],
        '&degC': ['&degF', (x: number) => {
            return (Math.round((x * (9.0 / 5.0) + 32.0) * 10) / 10).toFixed(1);
        }],
        '&degF/hr': ['&degC/hr', (x: number) => {
            return (Math.round(((x) * (5.0 / 9.0)) * 100) / 100).toFixed(1);
        }],
        '&degC/hr': ['&degF/hr', (x: number) => {
            return (Math.round((x * (9.0 / 5.0)) * 10) / 10).toFixed(1);
        }]
    };

    transform(measure: Measurement, convert: boolean, unitClass?: string): string {
        let converted: Measurement = { value: 'NA', unit: 'NA' };
        if (measure) {
            if (convert) {
                converted = this.convert(measure);
            } else {
                converted = measure;
            }
            if (unitClass) {
                return converted.value
                    + '<span class="' + unitClass + '">'
                    + converted.unit + '</span>';
            }
            return converted.value + '<span>' + converted.unit + '</span>';
        } else {
            return '';
        }
    }
    /**
     * Convert the given measure from metric to imperial or vice versa.
     * If unit does not exist, returns the original measurement.
     * @param  {Measurement} measure raw measurment
     * @return {Measurement}         converted measurement
     */
    private convert(measure: Measurement): Measurement {
        if (this.units[measure.unit]) {
            let converted = this.units[measure.unit][1](parseFloat(measure.value));
            return { value: converted, unit: this.units[measure.unit][0] };
        }
        return measure;
    }
}

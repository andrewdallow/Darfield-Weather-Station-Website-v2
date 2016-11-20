import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'compase' })
export class CompaseTextPipe implements PipeTransform {
    private directions: string[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

    transform(value: string) {
        if (value) {
            if (value === '360') {
                value = '0';
            }
            return this.directions[Math.floor((+value / 45))];
        }
        return value;
    }

}

export interface Graph24HrsData {
    timedate: string;
    temp: Array<number>;
    rain: Array<number>;
    baro: Array<number>;
    windGust: Array<number>;
    windGustDir: Array<number>;
    windGustDirText: Array<string>;
}

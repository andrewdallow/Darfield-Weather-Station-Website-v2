export interface Stats {
    avgTemp: string;
    maxTemp: string;
    avgMaxTemp: string;
    minTemp: string;
    avgMinTemp: string;
    totRainFall: string;
    highWindGust: string;
}
export interface AlltimeStats {
    maxTemp: string;
    minTemp: string;
    highWindGust: string;
}

export interface DataEntry {
    logDate: string;
    maxTemp: string;
    avgMaxTemp?: string;
    minTemp: string;
    avgMinTemp?: string;
    highWindGust: string;
    hWindGBear: string;
    totRainFall: string;
}

export interface HistoricData {
    stats: Stats;
    graphData: DataEntry[];
    alltime: AlltimeStats;
}
